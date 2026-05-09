#!/usr/bin/env python3

import argparse
import re
from pathlib import Path


REQUIRED_KEYS = {
    "slug",
    "title",
    "description",
    "triggers",
    "artifact_store",
    "execution",
    "skills_sh_lookup",
    "required_skills",
}

ALLOWED_ARTIFACT_STORES = {"auto", "runs", "openspec"}


def _read_text_lf(path: Path) -> str:
    raw = path.read_bytes()
    if b"\r" in raw:
        raise ValueError("workflow_spec.md must use LF line endings (found CRLF/CR)")
    return raw.decode("utf-8")


def _extract_frontmatter(md: str) -> tuple[list[str], str]:
    if not md.startswith("---\n"):
        raise ValueError("Missing YAML frontmatter (expected starting ---)")

    lines = md.splitlines(keepends=False)
    # Find closing frontmatter fence.
    end_idx = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_idx = i
            break
    if end_idx is None:
        raise ValueError("Invalid frontmatter block (missing closing ---)")

    fm_lines = lines[1:end_idx]
    body = "\n".join(lines[end_idx + 1 :]) + ("\n" if md.endswith("\n") else "")
    return fm_lines, body


def _strip_inline_comment(value: str) -> str:
    # Good-enough inline comment stripping for typical skill specs.
    # If the value starts with a quote, do not strip.
    v = value.strip()
    if not v or v[0] in ('"', "'"):
        return v
    return v.split("#", 1)[0].rstrip()


def _unquote(s: str) -> str:
    s = s.strip()
    if len(s) >= 2 and s[0] == s[-1] and s[0] in ('"', "'"):
        return s[1:-1]
    return s


def _parse_inline_list(value: str) -> list[str] | None:
    v = _strip_inline_comment(value).strip()
    if not (v.startswith("[") and v.endswith("]")):
        return None
    inner = v[1:-1].strip()
    if not inner:
        return []
    parts = [p.strip() for p in inner.split(",")]
    return [_unquote(p) for p in parts if p]


def _parse_frontmatter(fm_lines: list[str]) -> dict:
    out: dict = {}
    i = 0
    while i < len(fm_lines):
        line = fm_lines[i]
        i += 1

        if not line.strip() or line.lstrip().startswith("#"):
            continue

        # Top-level key: value
        m = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", line)
        if not m:
            continue

        key = m.group(1)
        raw_value = m.group(2)

        # Inline list support: optional_skills: []
        inline_list = _parse_inline_list(raw_value)
        if inline_list is not None:
            out[key] = inline_list
            continue

        v = _strip_inline_comment(raw_value).strip()
        if v:
            if v in {"true", "false"}:
                out[key] = v == "true"
            else:
                out[key] = _unquote(v)
            continue

        # Block value (we only parse string lists for keys we care about)
        block_lines: list[str] = []
        while i < len(fm_lines):
            nxt = fm_lines[i]
            if re.match(r"^([A-Za-z0-9_-]+):\s*", nxt):
                break
            block_lines.append(nxt)
            i += 1

        items: list[str] = []
        for b in block_lines:
            m_item = re.match(r"^\s*-\s*(.*)$", b)
            if not m_item:
                continue
            item = _strip_inline_comment(m_item.group(1)).strip()
            if item:
                items.append(_unquote(item))

        out[key] = items

    return out


def _is_kebab(s: str) -> bool:
    if not isinstance(s, str):
        return False
    s = s.strip()
    if not s:
        return False
    if s.startswith("-") or s.endswith("-"):
        return False
    if "--" in s:
        return False
    return bool(re.match(r"^[a-z0-9]+(?:-[a-z0-9]+)*$", s))


def validate_workflow_spec(path: Path) -> list[str]:
    errors: list[str] = []
    md = _read_text_lf(path)
    fm_lines, body = _extract_frontmatter(md)
    fm = _parse_frontmatter(fm_lines)

    missing = sorted(REQUIRED_KEYS - set(fm.keys()))
    if missing:
        errors.append(f"Missing required frontmatter keys: {', '.join(missing)}")

    slug = fm.get("slug")
    if not isinstance(slug, str) or not _is_kebab(slug):
        errors.append("frontmatter.slug must be kebab-case (lowercase letters/digits/hyphens)")

    title = fm.get("title")
    if not isinstance(title, str) or not title.strip():
        errors.append("frontmatter.title must be a non-empty string")

    description = fm.get("description")
    if not isinstance(description, str) or not description.strip():
        errors.append("frontmatter.description must be a non-empty string")

    triggers = fm.get("triggers")
    if not isinstance(triggers, list) or not triggers:
        errors.append("frontmatter.triggers must be a non-empty list of strings")
    else:
        clean = [t for t in triggers if isinstance(t, str) and t.strip()]
        if len(clean) != len(triggers):
            errors.append("frontmatter.triggers items must be non-empty strings")
        if len(clean) < 5 or len(clean) > 10:
            errors.append("frontmatter.triggers must contain 5-10 items")

    artifact_store = fm.get("artifact_store")
    if not isinstance(artifact_store, str) or artifact_store.strip() not in ALLOWED_ARTIFACT_STORES:
        allowed = ", ".join(sorted(ALLOWED_ARTIFACT_STORES))
        errors.append(f"frontmatter.artifact_store must be one of: {allowed}")

    execution = fm.get("execution")
    if execution != "plan-then-confirm":
        errors.append('frontmatter.execution must be "plan-then-confirm"')

    skills_sh_lookup = fm.get("skills_sh_lookup")
    if not isinstance(skills_sh_lookup, bool):
        errors.append("frontmatter.skills_sh_lookup must be a boolean")

    required_skills = fm.get("required_skills")
    if not isinstance(required_skills, list) or not required_skills:
        errors.append("frontmatter.required_skills must be a non-empty list of strings")
    else:
        bad = [x for x in required_skills if not isinstance(x, str) or not x.strip()]
        if bad:
            errors.append("frontmatter.required_skills items must be non-empty strings")

    optional_skills = fm.get("optional_skills")
    if optional_skills is not None:
        if not isinstance(optional_skills, list):
            errors.append("frontmatter.optional_skills must be a list of strings")
        else:
            bad = [x for x in optional_skills if not isinstance(x, str) or not x.strip()]
            if bad:
                errors.append("frontmatter.optional_skills items must be non-empty strings")

    required_headings = [
        "## Goal & Non-goals",
        "## Skill Chain",
        "## Verification & Stop Rules",
    ]
    for h in required_headings:
        if h not in body:
            errors.append(f"Missing required section heading: {h}")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate a workflow_spec.md against the workflow-creator contract")
    parser.add_argument("spec_path", help="Path to workflow_spec.md")
    args = parser.parse_args()

    spec_path = Path(args.spec_path).resolve()
    if not spec_path.exists():
        print(f"ERROR: file not found: {spec_path}")
        return 1
    if not spec_path.is_file():
        print(f"ERROR: not a file: {spec_path}")
        return 1

    try:
        errors = validate_workflow_spec(spec_path)
    except Exception as e:
        print(f"ERROR: {e}")
        return 1

    if errors:
        for e in errors:
            print(f"ERROR: {e}")
        return 1

    print("OK: workflow_spec.md is valid")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

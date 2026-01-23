#!/usr/bin/env python3

import argparse
import re
from pathlib import Path


def _read_text_lf(path: Path) -> str:
    raw = path.read_bytes()
    if b"\r" in raw:
        raise ValueError("SKILL.md must use LF line endings (found CRLF/CR)")
    return raw.decode("utf-8")


def _extract_frontmatter(md: str) -> dict:
    if not md.startswith("---\n"):
        raise ValueError("Missing YAML frontmatter (expected starting ---)")
    lines = md.splitlines(keepends=False)
    end_idx = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_idx = i
            break
    if end_idx is None:
        raise ValueError("Invalid frontmatter block (missing closing ---)")

    fm_lines = lines[1:end_idx]
    out: dict = {}
    for line in fm_lines:
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        m = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", line)
        if not m:
            continue
        key = m.group(1)
        value = m.group(2).strip()
        # Minimal scalar parsing only.
        if len(value) >= 2 and value[0] == value[-1] and value[0] in ('"', "'"):
            value = value[1:-1]
        out[key] = value
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


def validate_skill(path: Path) -> list[str]:
    errors: list[str] = []
    if path.is_dir():
        skill_dir = path
        skill_md = path / "SKILL.md"
    else:
        skill_md = path
        skill_dir = path.parent

    if not skill_md.exists():
        return [f"SKILL.md not found: {skill_md}"]

    md = _read_text_lf(skill_md)
    fm = _extract_frontmatter(md)

    name = fm.get("name")
    if not isinstance(name, str) or not name.strip():
        errors.append("frontmatter.name must be a non-empty string")
    else:
        name = name.strip()
        if not _is_kebab(name):
            errors.append("frontmatter.name must be kebab-case (lowercase letters/digits/hyphens)")
        if len(name) > 64:
            errors.append("frontmatter.name must be <= 64 characters")
        if name != skill_dir.name:
            errors.append(f"frontmatter.name '{name}' must match directory name '{skill_dir.name}'")

    description = fm.get("description")
    if not isinstance(description, str) or not description.strip():
        errors.append("frontmatter.description must be a non-empty string")
    else:
        if len(description.strip()) > 1024:
            errors.append("frontmatter.description must be <= 1024 characters")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate a skill folder's SKILL.md (no external deps)")
    parser.add_argument("path", help="Path to skill directory or SKILL.md")
    args = parser.parse_args()

    p = Path(args.path).resolve()
    if not p.exists():
        print(f"ERROR: not found: {p}")
        return 1

    try:
        errors = validate_skill(p)
    except Exception as e:
        print(f"ERROR: {e}")
        return 1

    if errors:
        for e in errors:
            print(f"ERROR: {e}")
        return 1

    print("OK: skill SKILL.md is valid")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

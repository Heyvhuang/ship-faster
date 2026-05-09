#!/usr/bin/env python3

import argparse
import subprocess
import sys
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parents[2]
SKILLS_DIR = REPO_ROOT / 'skills'


def _iter_skill_dirs(root: Path):
    for p in sorted(root.iterdir(), key=lambda x: x.name):
        if not p.is_dir():
            continue
        if p.name.startswith('.'):
            continue
        if p.name in {'assets', '_archive'}:
            continue
        if (p / 'SKILL.md').exists():
            yield p


def _read_frontmatter(md_path: Path):
    import re
    import yaml

    content = md_path.read_text()
    if not content.startswith('---'):
        return None
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return None
    try:
        data = yaml.safe_load(match.group(1))
    except Exception:
        return None
    return data if isinstance(data, dict) else None


def _warn(msg: str):
    print(f"WARN: {msg}")


def _error(msg: str):
    print(f"ERROR: {msg}")


def main() -> int:
    parser = argparse.ArgumentParser(description='Lint skills for ecosystem compatibility + Ship Faster quality gates')
    parser.add_argument('--check-generated', action='store_true', help='Also check generated artifacts are up to date')
    parser.add_argument('--strict', action='store_true', help='Turn some warnings into errors')
    args = parser.parse_args()

    # Import validator from sibling script.
    sys.path.insert(0, str(SCRIPT_DIR))
    import quick_validate as qv  # noqa: E402

    errors = 0

    for skill_dir in _iter_skill_dirs(SKILLS_DIR):
        ok, msg = qv.validate_skill(skill_dir)
        if not ok:
            _error(f"{skill_dir}: {msg}")
            errors += 1
            continue

        skill_md = skill_dir / 'SKILL.md'
        fm = _read_frontmatter(skill_md) or {}
        desc = fm.get('description')
        if not isinstance(desc, str):
            _error(f"{skill_md}: description missing or not string")
            errors += 1
            continue

        # Description discoverability heuristic (WHAT/WHEN/KEYWORDS signal)
        d = desc.lower()
        has_when = ('use when' in d) or ('use for' in d) or ('triggers:' in d) or ('trigger:' in d)
        if not has_when:
            _warn(f"{skill_md}: description missing explicit WHEN/trigger phrasing (recommend include 'Use when' or 'Triggers:')")
            if args.strict:
                errors += 1

        # Size gate
        line_count = len(skill_md.read_text().splitlines())
        if line_count > 1000:
            _error(f"{skill_md}: SKILL.md too large ({line_count} lines). Move details into references/ or rules/")
            errors += 1
        elif line_count > 500:
            _warn(f"{skill_md}: SKILL.md large ({line_count} lines). Prefer progressive disclosure via references/")

        # Service skills must declare allowed-tools list (we want this to be usable as a boundary)
        name = fm.get('name')
        stage = fm.get('metadata', {}).get('stage') if isinstance(fm.get('metadata'), dict) else None
        is_service = (name in {'supabase', 'stripe', 'cloudflare'}) or (stage == 'service')
        if is_service:
            allowed = fm.get('allowed-tools')
            if not isinstance(allowed, list) or not allowed:
                _error(f"{skill_md}: service skill must include non-empty allowed-tools YAML list")
                errors += 1

    # Generated drift checks
    if args.check_generated:
        r = subprocess.run(
            [sys.executable, str(SCRIPT_DIR / 'sync_catalog.py'), '--check'],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
        )
        if r.returncode != 0:
            _error("generated artifacts are out of date; run: python skills/skill-creator/scripts/sync_catalog.py")
            errors += 1
        if r.stdout.strip():
            # Keep output minimal, but surface if something failed.
            pass

    return 1 if errors else 0


if __name__ == '__main__':
    raise SystemExit(main())

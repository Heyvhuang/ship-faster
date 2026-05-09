#!/usr/bin/env python3

import argparse
import hashlib
import json
import os
import re
import subprocess
from datetime import date
from pathlib import Path

import yaml


SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parents[2]
SKILLS_DIR = REPO_ROOT / 'skills'
DOCS_DIR = REPO_ROOT / 'docs'


def _read_text(path: Path) -> str:
    if not path.exists():
        return ''
    return path.read_text()


def _sha256_text(s: str) -> str:
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


def _extract_frontmatter(md_path: Path) -> dict:
    raw = md_path.read_bytes()
    if b"\r" in raw:
        raise ValueError(f"{md_path} must use LF line endings (found CRLF/CR)")

    content = md_path.read_text()
    if not content.startswith('---'):
        raise ValueError(f"{md_path} missing YAML frontmatter")

    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        raise ValueError(f"{md_path} invalid frontmatter format")

    data = yaml.safe_load(match.group(1))
    if not isinstance(data, dict):
        raise ValueError(f"{md_path} frontmatter must be a YAML dictionary")
    return data


def _load_manifest(path: Path) -> dict:
    if not path.exists():
        return {}
    try:
        data = json.loads(path.read_text())
    except Exception:
        return {}
    return data if isinstance(data, dict) else {}


def _infer_group(skill: dict) -> str:
    name = skill.get('name', '')
    stage = skill.get('stage', '')

    if isinstance(name, str) and name.startswith('tool-x-'):
        return 'Publishing'

    if stage == 'workflow':
        return 'Workflows'
    if stage == 'tool':
        return 'Tools'
    if stage == 'review':
        return 'Reviews'
    if stage == 'service':
        return 'Services'
    if stage == 'meta':
        return 'Maintenance'

    return 'Other'


def _generate_skills_map_svg(manifest: dict) -> str:
    skills = manifest.get('skills')
    if not isinstance(skills, list):
        skills = []

    groups = {
        'Workflows': [],
        'Tools': [],
        'Reviews': [],
        'Services': [],
        'Maintenance': [],
        'Publishing': [],
    }
    extra = []
    for s in skills:
        if not isinstance(s, dict):
            continue
        g = _infer_group(s)
        name = s.get('name')
        if not isinstance(name, str):
            continue
        name = name.strip()
        if not name:
            continue
        if g in groups:
            groups[g].append(name)
        else:
            extra.append(name)

    if extra:
        groups['Tools'].extend(extra)

    for k in groups:
        groups[k] = sorted(set(groups[k]))

    # Fixed layout (3 columns x 2 rows)
    slots = [
        ('Workflows', 40, 80, True),
        ('Tools', 420, 80, False),
        ('Reviews', 800, 80, False),
        ('Services', 40, 280, False),
        ('Maintenance', 420, 280, False),
        ('Publishing', 800, 280, False),
    ]

    svg = []
    svg.append('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="520" viewBox="0 0 1200 520" role="img" aria-label="Skills map">')
    svg.append('  <style>')
    svg.append('    .title { font: 700 20px Helvetica, Arial, sans-serif; fill: #111827; }')
    svg.append('    .label { font: 600 13px Helvetica, Arial, sans-serif; fill: #111827; }')
    svg.append('    .text { font: 12px Helvetica, Arial, sans-serif; fill: #111827; }')
    svg.append('    .muted { font: 11px Helvetica, Arial, sans-serif; fill: #6B7280; }')
    svg.append('    .box { fill: #F8FAFC; stroke: #CBD5E1; stroke-width: 1; rx: 10; }')
    svg.append('    .accent { fill: #EEF2FF; stroke: #6366F1; }')
    svg.append('  </style>')
    svg.append('')
    svg.append('  <rect x="24" y="16" width="1152" height="488" rx="16" fill="#FFFFFF" stroke="#E5E7EB" />')
    svg.append('  <text x="40" y="48" class="title">Skills map</text>')
    svg.append('')

    for title, x, y, accent in slots:
        cls = 'box accent' if accent else 'box'
        svg.append(f'  <rect x="{x}" y="{y}" width="360" height="160" class="{cls}" />')
        svg.append(f'  <text x="{x + 16}" y="{y + 28}" class="label">{title}</text>')

        items = groups.get(title, [])
        if not items:
            svg.append(f'  <text x="{x + 16}" y="{y + 52}" class="muted">(none)</text>')
            continue

        line_y = y + 52
        for item in items[:6]:
            svg.append(f'  <text x="{x + 16}" y="{line_y}" class="text">{item}</text>')
            line_y += 18
        if len(items) > 6:
            svg.append(f'  <text x="{x + 16}" y="{line_y}" class="muted">(+{len(items) - 6} more)</text>')

        svg.append('')

    svg.append('</svg>')
    svg.append('')
    return "\n".join(svg)


def _generate_docs_catalog(manifest: dict) -> str:
    skills = manifest.get('skills')
    if not isinstance(skills, list):
        skills = []

    lines = []
    lines.append('# Skills Catalog')
    lines.append('')
    lines.append('> Generated file. Do not edit by hand.')
    lines.append('')
    lines.append('Install (skills.sh):')
    lines.append('')
    lines.append('```bash')
    lines.append('npx --yes skills add Heyvhuang/ship-faster --list')
    lines.append('npx --yes skills add Heyvhuang/ship-faster --yes --agent claude-code')
    lines.append('npx --yes skills add Heyvhuang/ship-faster --yes --agent claude-code --skill workflow-ship-faster')
    lines.append('```')
    lines.append('')
    lines.append('| Name | Stage | Summary |')
    lines.append('|------|-------|---------|')
    for s in skills:
        if not isinstance(s, dict):
            continue
        name = s.get('name')
        stage = s.get('stage')
        summary = s.get('summary')
        if not isinstance(name, str) or not isinstance(stage, str) or not isinstance(summary, str):
            continue
        lines.append(f'| `{name}` | `{stage}` | {summary} |')
    lines.append('')
    return "\n".join(lines)


def _generate_archive_catalog(archive_dir: Path) -> str:
    lines = []
    lines.append('# Archived Skills Catalog')
    lines.append('')
    lines.append('> Generated file. Do not edit by hand.')
    lines.append('')
    lines.append('These skills live under `skills/_archive/` and are not part of the default public surface.')
    lines.append('')
    lines.append('| Name | Summary |')
    lines.append('|------|---------|')

    for skill_dir in sorted([p for p in archive_dir.iterdir() if p.is_dir()], key=lambda p: p.name):
        if skill_dir.name.startswith('.'):
            continue
        skill_md = skill_dir / 'SKILL.md'
        if not skill_md.exists():
            continue
        fm = _extract_frontmatter(skill_md)
        name = fm.get('name')
        desc = fm.get('description')
        if not isinstance(name, str) or not isinstance(desc, str):
            continue
        lines.append(f'| `{name.strip()}` | {desc.strip()} |')

    lines.append('')
    return "\n".join(lines)


def _write_or_check(path: Path, content: str, check: bool) -> bool:
    existing = _read_text(path)
    if existing == content:
        return True
    if check:
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)
    return True


def _render_svg_to_png(svg_path: Path, png_path: Path) -> None:
    # Best-effort: only if rsvg-convert exists.
    if not shutil_which('rsvg-convert'):
        return
    png_path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ['rsvg-convert', '-o', str(png_path), str(svg_path)],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def shutil_which(cmd: str) -> str:
    for p in os.environ.get('PATH', '').split(os.pathsep):
        cand = Path(p) / cmd
        if cand.exists() and os.access(str(cand), os.X_OK):
            return str(cand)
    return ''


def main() -> int:
    parser = argparse.ArgumentParser(description='Sync generated catalogs/assets from skills/*/SKILL.md (SSOT)')
    parser.add_argument('--check', action='store_true', help='Fail if generated files are out of date')
    args = parser.parse_args()

    check = bool(args.check)

    manifest_path = SKILLS_DIR / 'manifest.json'
    existing_manifest = _load_manifest(manifest_path)
    existing_version = existing_manifest.get('skillsVersion') if isinstance(existing_manifest.get('skillsVersion'), str) else None
    existing_generated_at = existing_manifest.get('generatedAt') if isinstance(existing_manifest.get('generatedAt'), str) else None
    skills_version = existing_version or date.today().isoformat()
    generated_at = existing_generated_at or date.today().isoformat()

    # Import generator from sibling script.
    import sys

    sys.path.insert(0, str(SCRIPT_DIR))
    import generate_manifest as gm  # noqa: E402

    manifest = gm.generate_manifest(
        skills_dir=SKILLS_DIR,
        existing_manifest_path=manifest_path,
        skills_version=skills_version,
        generated_at=generated_at,
    )
    manifest_json = json.dumps(manifest, indent=2, ensure_ascii=True) + "\n"

    ok = True
    ok = _write_or_check(manifest_path, manifest_json, check=check) and ok

    svg_path = SKILLS_DIR / 'assets' / 'skills-map.svg'
    svg = _generate_skills_map_svg(manifest)
    ok = _write_or_check(svg_path, svg, check=check) and ok

    # Keep PNG in sync (best-effort).
    if not check:
        try:
            _render_svg_to_png(svg_path, SKILLS_DIR / 'assets' / 'skills-map.png')
        except Exception:
            pass

    docs_catalog_path = DOCS_DIR / 'skills-catalog.md'
    docs_catalog = _generate_docs_catalog(manifest)
    ok = _write_or_check(docs_catalog_path, docs_catalog, check=check) and ok

    archive_catalog_path = SKILLS_DIR / '_archive' / 'catalog.md'
    archive_catalog = _generate_archive_catalog(SKILLS_DIR / '_archive')
    ok = _write_or_check(archive_catalog_path, archive_catalog, check=check) and ok

    if check and not ok:
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())

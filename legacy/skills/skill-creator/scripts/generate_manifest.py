#!/usr/bin/env python3

import argparse
import json
import re
from datetime import date
from pathlib import Path

import yaml


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


def _infer_stage(skill_name: str) -> str:
    if skill_name.startswith('workflow-'):
        return 'workflow'
    if skill_name.startswith('tool-'):
        return 'tool'
    if skill_name.startswith('review-'):
        return 'review'
    if skill_name in {'supabase', 'stripe', 'cloudflare'}:
        return 'service'
    if skill_name.startswith('skill-'):
        return 'meta'
    return 'meta'


def _normalize_tags(tags):
    if tags is None:
        return None
    if isinstance(tags, str):
        parts = [p.strip() for p in tags.split(',')]
        return [p for p in parts if p]
    if isinstance(tags, list):
        out = []
        for item in tags:
            if not isinstance(item, str):
                continue
            s = item.strip()
            if s:
                out.append(s)
        return out
    return None


def _load_existing_manifest(manifest_path: Path) -> dict:
    if not manifest_path.exists():
        return {}
    try:
        data = json.loads(manifest_path.read_text())
    except Exception:
        return {}
    if not isinstance(data, dict):
        return {}
    return data


def _existing_skills_by_name(existing_manifest: dict) -> dict:
    skills = existing_manifest.get('skills')
    if not isinstance(skills, list):
        return {}
    out = {}
    for item in skills:
        if not isinstance(item, dict):
            continue
        name = item.get('name')
        if isinstance(name, str) and name:
            out[name] = item
    return out


def generate_manifest(skills_dir: Path, existing_manifest_path: Path, skills_version: str, generated_at: str):
    existing_manifest = _load_existing_manifest(existing_manifest_path)
    existing_by_name = _existing_skills_by_name(existing_manifest)

    skills = []
    for skill_dir in sorted([p for p in skills_dir.iterdir() if p.is_dir()], key=lambda p: p.name):
        if skill_dir.name in {'assets', '_archive'}:
            continue
        if skill_dir.name.startswith('.'):
            continue

        skill_md = skill_dir / 'SKILL.md'
        if not skill_md.exists():
            continue

        frontmatter = _extract_frontmatter(skill_md)

        name = frontmatter.get('name')
        description = frontmatter.get('description')
        if not isinstance(name, str) or not name.strip():
            raise ValueError(f"{skill_md} frontmatter missing valid 'name'")
        if not isinstance(description, str) or not description.strip():
            raise ValueError(f"{skill_md} frontmatter missing valid 'description'")

        name = name.strip()
        if name != skill_dir.name:
            raise ValueError(f"{skill_md} frontmatter name '{name}' must match directory name '{skill_dir.name}'")

        metadata = frontmatter.get('metadata')
        if not isinstance(metadata, dict):
            metadata = {}

        prior = existing_by_name.get(name, {})

        stage = metadata.get('stage') if isinstance(metadata.get('stage'), str) else prior.get('stage')
        if not isinstance(stage, str) or not stage:
            stage = _infer_stage(name)

        tags = _normalize_tags(metadata.get('tags'))
        if tags is None:
            tags = prior.get('tags') if isinstance(prior.get('tags'), list) else None
        if tags is None:
            tags = []
        tag_set = []
        for t in [stage] + tags:
            if isinstance(t, str):
                s = t.strip()
                if s and s not in tag_set:
                    tag_set.append(s)
        tags = tag_set

        summary = prior.get('summary') if isinstance(prior.get('summary'), str) and prior.get('summary').strip() else description.strip()
        if len(summary) > 240:
            summary = summary[:237].rstrip() + "..."

        skills.append(
            {
                'name': name,
                'dir': skill_dir.name,
                'skillMd': f"{skill_dir.name}/SKILL.md",
                'stage': stage,
                'tags': tags,
                'summary': summary,
            }
        )

    return {
        'schemaVersion': 1,
        'skillsVersion': skills_version,
        'generatedAt': generated_at,
        'skills': skills,
    }


def main():
    parser = argparse.ArgumentParser(description="Generate skills/manifest.json from skills/*/SKILL.md frontmatter")
    parser.add_argument('--skills-dir', default=None, help="Path to skills directory (defaults to repo's skills/)")
    parser.add_argument('--output', default=None, help="Output manifest path (defaults to skills/manifest.json)")
    parser.add_argument('--version', default=None, help="skillsVersion value (default: today's date YYYY-MM-DD)")
    parser.add_argument('--generated-at', default=None, help="generatedAt value (default: today's date YYYY-MM-DD)")
    parser.add_argument('--dry-run', action='store_true', help="Print JSON to stdout instead of writing")
    args = parser.parse_args()

    default_skills_dir = Path(__file__).resolve().parents[2]
    skills_dir = Path(args.skills_dir).resolve() if args.skills_dir else default_skills_dir
    output_path = Path(args.output).resolve() if args.output else (skills_dir / 'manifest.json')

    existing = _load_existing_manifest(output_path)
    existing_version = existing.get('skillsVersion') if isinstance(existing.get('skillsVersion'), str) else None
    existing_generated_at = existing.get('generatedAt') if isinstance(existing.get('generatedAt'), str) else None
    skills_version = args.version or existing_version or date.today().isoformat()
    generated_at = args.generated_at or existing_generated_at or date.today().isoformat()

    manifest = generate_manifest(
        skills_dir=skills_dir,
        existing_manifest_path=output_path,
        skills_version=skills_version,
        generated_at=generated_at,
    )

    payload = json.dumps(manifest, indent=2, ensure_ascii=True) + "\n"

    if args.dry_run:
        print(payload, end="")
        return 0

    output_path.write_text(payload)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())

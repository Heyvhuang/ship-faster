#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import re
import shutil
import sys
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class CheckboxStats:
    total: int
    unchecked: int
    verification_total: int
    verification_unchecked: int


CHECKBOX_RE = re.compile(r"^\s*[-*]\s+\[(?P<mark>[ xX])\]\s+")
HEADING_RE = re.compile(r"^\s*(?P<level>#{1,6})\s+(?P<title>.+?)\s*$")


def _is_code_fence(line: str) -> bool:
    return line.lstrip().startswith("```")


def compute_checkbox_stats(tasks_md: Path) -> CheckboxStats:
    text = tasks_md.read_text(encoding="utf-8")
    in_code_block = False
    current_section = ""

    total = 0
    unchecked = 0
    verification_total = 0
    verification_unchecked = 0

    for raw_line in text.splitlines():
        line = raw_line.rstrip("\n")

        if _is_code_fence(line):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue

        heading_match = HEADING_RE.match(line)
        if heading_match:
            current_section = heading_match.group("title").strip()
            continue

        checkbox_match = CHECKBOX_RE.match(line)
        if not checkbox_match:
            continue

        total += 1
        checked = checkbox_match.group("mark").lower() == "x"
        if not checked:
            unchecked += 1

        normalized_section = re.sub(r"^\d+\.\s*", "", current_section.strip().lower())
        if normalized_section in {"verification", "testing"}:
            verification_total += 1
            if not checked:
                verification_unchecked += 1

    return CheckboxStats(
        total=total,
        unchecked=unchecked,
        verification_total=verification_total,
        verification_unchecked=verification_unchecked,
    )


def resolve_archive_destination(run_dir: Path) -> tuple[Path, Path]:
    """
    Returns (source_dir, destination_dir).

    Supported active directories:
    - runs/<workflow>/active/<run_id>/
    - openspec/changes/<change-id>/
    """
    run_dir = run_dir.resolve()

    parts = list(run_dir.parts)
    if "runs" in parts:
        runs_i = parts.index("runs")
        if len(parts) < runs_i + 4:
            raise ValueError(f"Invalid runs run_dir (expected runs/<workflow>/active/<run_id>): {run_dir}")
        workflow = parts[runs_i + 1]
        active_marker = parts[runs_i + 2]
        run_id = parts[runs_i + 3]
        if active_marker != "active":
            raise ValueError(f"Invalid runs run_dir (expected .../active/...): {run_dir}")

        today = dt.datetime.utcnow().date().isoformat()
        dest_parts = parts[: runs_i + 2] + ["archive", f"{today}-{run_id}"] + parts[runs_i + 4 :]
        dest = Path(*dest_parts)
        return run_dir, dest

    if "openspec" in parts and "changes" in parts:
        openspec_i = parts.index("openspec")
        changes_i = parts.index("changes")
        if changes_i != openspec_i + 1:
            raise ValueError(f"Invalid OpenSpec run_dir (expected openspec/changes/<id>): {run_dir}")
        if len(parts) < changes_i + 2:
            raise ValueError(f"Invalid OpenSpec run_dir (expected openspec/changes/<id>): {run_dir}")
        change_id = parts[changes_i + 1]
        if change_id == "archive":
            raise ValueError(f"Already archived (run_dir is under openspec/changes/archive): {run_dir}")

        today = dt.datetime.utcnow().date().isoformat()
        dest_parts = parts[: changes_i + 1] + ["archive", f"{today}-{change_id}"] + parts[changes_i + 2 :]
        dest = Path(*dest_parts)
        return run_dir, dest

    raise ValueError(
        "Unsupported run_dir backend. Expected either:\n"
        "- runs/<workflow>/active/<run_id>/\n"
        "- openspec/changes/<change-id>/\n"
        f"Got: {run_dir}"
    )


def is_eligible_for_auto_archive(tasks_md: Path) -> tuple[bool, str]:
    stats = compute_checkbox_stats(tasks_md)

    if stats.total == 0:
        return False, "No checkboxes found in tasks.md."

    if stats.unchecked > 0:
        return False, f"{stats.unchecked}/{stats.total} checkbox items are still unchecked."

    if stats.verification_total == 0:
        return False, "Missing a verification section (`## Verification` or `## Testing`) with at least one checkbox item."

    if stats.verification_unchecked > 0:
        return (
            False,
            f"{stats.verification_unchecked}/{stats.verification_total} verification items are still unchecked.",
        )

    return True, "Eligible."


def archive_run_dir(run_dir: Path, *, dry_run: bool) -> Path:
    src, dest = resolve_archive_destination(run_dir)

    if dest == src:
        raise ValueError(f"Refusing to archive to the same path: {src}")
    if dest.exists():
        raise FileExistsError(f"Archive destination already exists: {dest}")

    dest.parent.mkdir(parents=True, exist_ok=True)

    if dry_run:
        print(f"[auto-archive] DRY RUN: would move {src} -> {dest}")
        return dest

    shutil.move(str(src), str(dest))
    print(f"[auto-archive] Archived: {src} -> {dest}")
    return dest


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(
        prog="auto_archive.py",
        description="Auto-archive a Ship Faster run directory when tasks + verification are complete.",
    )
    parser.add_argument("--run-dir", required=True, help="Run directory (runs/.../active/... or openspec/changes/...).")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would happen without moving any files.",
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Exit non-zero when not eligible for archive (default: no-op with exit code 0).",
    )

    args = parser.parse_args(argv)
    run_dir = Path(args.run_dir)

    tasks_md = run_dir / "tasks.md"
    if not tasks_md.exists():
        print(f"[auto-archive] ERROR: missing tasks.md at: {tasks_md}", file=sys.stderr)
        return 2

    eligible, reason = is_eligible_for_auto_archive(tasks_md)
    if not eligible:
        print(f"[auto-archive] Skipped: {reason}")
        return 1 if args.strict else 0

    try:
        archive_run_dir(run_dir, dry_run=args.dry_run)
    except (OSError, ValueError, shutil.Error) as exc:
        print(f"[auto-archive] ERROR: {exc}", file=sys.stderr)
        return 3

    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))

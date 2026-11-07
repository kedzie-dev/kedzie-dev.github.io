#!/usr/bin/env python3
"""Validate repository security policies that can be checked deterministically."""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
WORKFLOW_DIR = ROOT / ".github" / "workflows"
SITE = ROOT / "site"
PUBLIC_EXTENSIONS = {".html", ".css", ".js", ".json", ".xml", ".svg", ".txt"}

ALLOWED_ACTIONS = {
    "gitleaks/gitleaks-action",
}
ALLOWED_PERMISSION_VALUES = {
    ("contents", "read"),
    ("id-token", "write"),
    ("pages", "write"),
}

errors: list[str] = []


def git(*args: str) -> str:
    result = subprocess.run(
        ["git", *args],
        cwd=ROOT,
        check=False,
        capture_output=True,
        text=True,
    )
    if result.returncode:
        errors.append(f"git {' '.join(args)} failed: {result.stderr.strip()}")
    return result.stdout


def check_ignored(path: str) -> None:
    result = subprocess.run(
        ["git", "check-ignore", "--no-index", "--quiet", path],
        cwd=ROOT,
        check=False,
    )
    if result.returncode != 0:
        errors.append(f"{path} must be covered by .gitignore")


def check_sensitive_files() -> None:
    tracked = git("ls-files", "-z").split("\0")
    forbidden = [
        path
        for path in tracked
        if path and (Path(path).name == ".env" or path.lower().endswith(".csv"))
    ]
    if forbidden:
        errors.append("tracked sensitive files: " + ", ".join(sorted(forbidden)))

    check_ignored(".env")
    check_ignored("security-check.csv")


def check_publish_directory() -> None:
    if not (SITE / "index.html").is_file() or not (SITE / ".nojekyll").is_file():
        errors.append("site/ must contain index.html and .nojekyll")

    # Everything in site/ is public: keep drafts and source documents outside it.
    for path in SITE.rglob("*"):
        if path.is_symlink():
            errors.append(f"publish directory contains symlink: {path.relative_to(ROOT)}")
        elif path.is_file() and path.name != ".nojekyll":
            if path.suffix.lower() not in PUBLIC_EXTENSIONS or any(
                part.startswith(".") or part.lower() in {"draft", "drafts"}
                for part in path.relative_to(SITE).parts
            ):
                errors.append(f"non-public file in publish directory: {path.relative_to(ROOT)}")


def action_is_allowed(action: str) -> bool:
    if action.startswith("./"):
        return True
    if "@" not in action:
        return False

    repository, version = action.rsplit("@", 1)
    owner = repository.split("/", 1)[0]
    trusted = owner == "actions" or repository in ALLOWED_ACTIONS
    pinned = bool(re.fullmatch(r"v[1-9][0-9]*|[0-9a-f]{40}", version))
    return trusted and pinned


def check_permissions(path: Path, lines: list[str]) -> None:
    found = False
    for index, line in enumerate(lines):
        match = re.match(r"^(\s*)permissions:\s*(.*?)\s*$", line)
        if not match:
            continue
        found = True
        base_indent = len(match.group(1))
        inline_value = match.group(2)
        if inline_value and not inline_value.startswith("#"):
            errors.append(f"{path.relative_to(ROOT)}:{index + 1}: permissions must be an explicit map")
            continue

        for child_index in range(index + 1, len(lines)):
            child = lines[child_index]
            if not child.strip() or child.lstrip().startswith("#"):
                continue
            indent = len(child) - len(child.lstrip())
            if indent <= base_indent:
                break
            permission = re.match(r"^\s*([a-z-]+):\s*([a-z-]+)\s*(?:#.*)?$", child)
            if not permission:
                errors.append(
                    f"{path.relative_to(ROOT)}:{child_index + 1}: invalid permission declaration"
                )
                continue
            item = permission.groups()
            if item not in ALLOWED_PERMISSION_VALUES:
                errors.append(
                    f"{path.relative_to(ROOT)}:{child_index + 1}: disallowed permission "
                    f"{item[0]}: {item[1]}"
                )

    if not found:
        errors.append(f"{path.relative_to(ROOT)} must declare permissions explicitly")


def check_workflows() -> None:
    workflows = sorted((*WORKFLOW_DIR.glob("*.yml"), *WORKFLOW_DIR.glob("*.yaml")))
    if not workflows:
        errors.append("no GitHub Actions workflows found")
        return

    for path in workflows:
        text = path.read_text(encoding="utf-8")
        lines = text.splitlines()
        if re.search(r"^\s*pull_request_target\s*:", text, re.MULTILINE):
            errors.append(f"{path.relative_to(ROOT)}: pull_request_target is forbidden")

        for index, line in enumerate(lines, start=1):
            match = re.match(r"^\s*-\s*uses:\s*['\"]?([^'\"\s#]+)", line)
            if match and not action_is_allowed(match.group(1)):
                errors.append(
                    f"{path.relative_to(ROOT)}:{index}: untrusted or unpinned action "
                    f"{match.group(1)}"
                )

        check_permissions(path, lines)


def check_submodules() -> None:
    gitlinks = []
    for line in git("ls-files", "--stage").splitlines():
        fields = line.split(maxsplit=3)
        if fields and fields[0] == "160000":
            gitlinks.append(fields[3])

    if gitlinks and not (ROOT / ".gitmodules").is_file():
        errors.append("gitlinks exist without a tracked .gitmodules file")


def main() -> int:
    check_sensitive_files()
    check_publish_directory()
    check_workflows()
    check_submodules()

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    print("Security policy checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

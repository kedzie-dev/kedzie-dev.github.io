#!/usr/bin/env python3
"""Check the hand-edited site without building or changing any files."""

from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


SITE = Path(__file__).resolve().parents[1] / "site"
ORIGIN = "https://kedzie-dev.github.io"


class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.refs: list[str] = []
        self.ids: set[str] = set()
        self.canonical: str | None = None
        self.redirect = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if attributes.get("id"):
            self.ids.add(attributes["id"])
        for key in ("href", "src", "data-target"):
            if attributes.get(key):
                self.refs.append(attributes[key])
        if tag == "link" and attributes.get("rel") == "canonical":
            self.canonical = attributes.get("href")
        if tag == "meta" and attributes.get("http-equiv", "").lower() == "refresh":
            self.redirect = True
            content = attributes.get("content", "")
            if "; url=" in content:
                self.refs.append(content.split("; url=", 1)[1])


def main() -> int:
    errors: list[str] = []
    pages: dict[Path, Page] = {}
    for path in sorted(SITE.rglob("*.html")):
        source = path.read_text(encoding="utf-8")
        if not source.lower().startswith("<!doctype html>"):
            errors.append(f"{path.relative_to(SITE)}: missing HTML doctype")
        page = Page()
        page.feed(source)
        pages[path] = page

    if not pages:
        errors.append("site/ contains no HTML pages")

    def check_ref(source: Path, ref: str) -> None:
        url = urlsplit(urljoin(f"{ORIGIN}/{source.relative_to(SITE)}", ref))
        if url.scheme not in {"http", "https"} or url.netloc != urlsplit(ORIGIN).netloc:
            return
        target = (SITE / unquote(url.path).lstrip("/")).resolve()
        if not target.is_relative_to(SITE):
            errors.append(f"{source.relative_to(SITE)}: path leaves site/: {ref}")
            return
        if target.is_dir():
            target /= "index.html"
        if not target.is_file():
            errors.append(f"{source.relative_to(SITE)}: missing target: {ref}")
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f"{source.relative_to(SITE)}: missing heading: {ref}")

    for path, page in pages.items():
        if not page.canonical and path.name != "404.html":
            errors.append(f"{path.relative_to(SITE)}: missing canonical URL")
        if page.canonical and not page.redirect:
            expected = f"{ORIGIN}/{path.relative_to(SITE)}".removesuffix("index.html")
            if page.canonical != expected:
                errors.append(f"{path.relative_to(SITE)}: canonical must be {expected}")
        for ref in page.refs:
            check_ref(path, ref)

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    print(f"Static site checks passed: {len(pages)} HTML pages.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

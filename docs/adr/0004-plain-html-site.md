# Publish hand-edited HTML without a site generator

Remove Hugo and make `site/` the source of truth for complete HTML, CSS, JavaScript, RSS, the search index, and the sitemap. The owner chose direct HTML editing to keep the site understandable without a template engine, dependency installation, or build step. GitHub Actions validates and uploads this directory unchanged.

This supersedes ADR-0001's Hugo theme choice and ADR-0002's Hugo alias implementation. Collection URLs, static redirects for legacy URLs, and ADR-0003's content-first design and reader capabilities remain in force. Shared markup, lists, search records, RSS, and sitemap entries now require explicit edits alongside articles; no replacement generator is introduced.

# Kedzie Atlas Migration

Historical migration plan. Superseded by the content-first design in ADR-0003 and the plain HTML architecture in [ADR-0004](adr/0004-plain-html-site.md). Current editing and deployment instructions are in [README.md](../README.md).

## Target

- Hugo remains the site generator.
- `themes/kedzie-atlas/` becomes the self-owned site theme.
- Blowfish is a temporary fallback only. Remove it after feature parity is verified.
- The public site uses Atlas Visual Language: parchment by default and Night Chart for low-light reading.
- Article pages remain reading-first. Atlas appears through navigation, landmarks, and visual language rather than a large map behind long-form text.

## Information Architecture

| Canonical URL | Reader-facing role | Content model |
| --- | --- | --- |
| `/` | Kedzie Dev Atlas | domain-based discovery hub |
| `/notes/` | Operational Notes | focused technical articles |
| `/labs/` | Incident Labs | interactive operational scenarios |
| `/cases/` | Operational Cases | portfolio decisions and evidence links |
| `/tech-map/` | Technology Evolution Map | independent time and causal exploration |

The Atlas map crosses these collections by Atlas Landmark. A resource is not copied into every matching region.

## Content Contract

Each resource keeps a concise common front matter contract:

```toml
summary = "Card and map-panel description."
landmarks = ["gitops", "argocd"]
featured = true
```

- The Hugo section determines its Content Collection.
- `landmarks` is an Atlas Classification and may contain several Landmark Registry IDs.
- `summary` is the explicit short description for map panels and collection cards.
- `featured` controls curated home and Collection placement.
- Collections may add only their genuinely specific fields. Avoid a large universal schema.

The Landmark Registry owns the eight core Landmark names, descriptions, badges, and map presentation. Content pages only reference Landmark IDs.

## URL Migration

- Move the existing `/posts/<slug>/` resources to `/notes/<slug>/`.
- Move the existing `/portfolio/` material into `/cases/` as independent Operational Cases, with supporting Notes and Labs linked as evidence.
- Move `/tech-evolution-map/` to `/tech-map/`; preserve its independent interaction model while applying Atlas Visual Language.
- Keep `/labs/` as the Incident Labs collection and preserve its interactive scenarios.
- Retain every old public route indefinitely with Hugo `aliases`. GitHub Pages serves these as static redirect pages, not HTTP 301 responses.
- Update internal links, menus, canonical metadata, and sitemap references to the new canonical URLs.

## Theme Transition

1. Create `themes/kedzie-atlas/` with the new base layout, header, footer, appearance switch, and semantic asset loading.
2. Place Kedzie Atlas ahead of Blowfish only while unimplemented templates require fallback.
3. Implement home Atlas, Collection lists, reading-first single pages, search, code presentation, table of contents, taxonomy, Mermaid, Incident Labs, simulator, and Technology Evolution Map.
4. Add the Landmark Registry and migrate content front matter and aliases.
5. Verify the complete site, then remove Blowfish and its configuration.

## Styling Decision Gate

Do not choose Tailwind before reviewing the Stitch export.

- Use a locally compiled Tailwind build if Stitch supplies maintainable utility-class markup and preserving that structure materially reduces migration work.
- Prefer local CSS with design tokens and semantic component classes if the export is conventional HTML/CSS or if Tailwind would mainly reproduce bespoke map styling.
- In either case, keep behavior framework-free: semantic Hugo templates, inline SVG for map geometry, and small vanilla JavaScript only where interaction needs it.

## Release Gate

Publish the visual migration only after all of these pass:

- Hugo production build.
- New canonical URLs, legacy aliases, internal links, and sitemap links.
- Desktop and mobile browser screenshots.
- Keyboard access for header navigation, appearance switching, Atlas Landmarks, detail panels, and Collection links.
- Incident Labs, simulator, Technology Evolution Map, Mermaid, search, code copy, table of contents, and taxonomy behavior.

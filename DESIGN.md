# Blog design

The site is a reading tool. Content and accessibility take priority over visual identity.

## Pages

- Home: one sentence explaining the blog, then recent writing and links to the other collections.
- Collections: title, description, and a plain list of entries. Titles are links; summaries and dates help readers choose.
- Articles: one readable column. A table of contents may precede long articles. Code, tables, and diagrams must remain usable on small screens.
- Readers find writing through the home and collection links, then use the browser's find command within a page.

## Visual rules

- White background, dark text, visible blue links, simple borders.
- System fonts; no external font or decorative image dependency.
- Body width around 46rem. Text and controls remain readable on mobile.
- Use semantic HTML, keyboard focus outlines, a skip link, descriptive labels, and reduced motion preference.
- Add interface only when it helps a reader find, read, or use content.

## Keep working

Canonical URLs, old URL aliases for writing and cases, and Mermaid diagrams remain available.

The owner chose an HTML/CSS-first blog without site search, RSS, code-copy buttons, robots.txt, or a sitemap. Remove the supporting data files and controls rather than maintaining duplicate content. JavaScript is limited to article diagrams and preserving query strings and heading fragments on legacy redirects. This supersedes the search, RSS, code-copy, and sitemap requirements in ADR-0001 through ADR-0004.

The owner requested removal of Incident Labs and the Technology Evolution Map, including their legacy URLs. This supersedes the requirements to retain those collections and capabilities in ADR-0001 through ADR-0004.

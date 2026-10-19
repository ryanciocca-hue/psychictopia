# "Shipping's On Us" brochure — 3 redesign variations

One-page US Letter (8.5 × 11 in) redesigns of the Broadview Heights service center flyer.

| File | Direction |
| --- | --- |
| `v1-clean-corporate.html` | White, minimal, Swiss-style. Big two-line headline, `$0` return-freight callout, navy contact footer. Inter. |
| `v2-blueprint-hero.html` | Bold blue hero with the blueprint line art and a blueprint grid, "How it works" card overlapping the hero, chip-style capabilities. Barlow / Barlow Condensed. |
| `v3-spec-sheet.html` | Technical spec-sheet layout: navy sidebar with location, contact, on-site capabilities and CTA; offer, steps and expertise on the right. IBM Plex Sans / Mono. |

Ready-to-use exports are in `exports/` (print-ready PDF + 2× PNG preview of each).

## Editing and re-exporting

Open any `.html` file in a browser to preview it. After editing, regenerate the PDFs and PNGs with:

```sh
node export.cjs                      # all three
node export.cjs v2-blueprint-hero    # just one
```

This needs Node and Playwright (with Chromium). The script warns if content overflows the page.

## Notes

- Fonts (OFL) are stored in `assets/fonts/` so the pages render the same offline. They are static weights on purpose: Chromium embeds variable fonts in PDFs as Type 3, which print shops often reject.
- `assets/logo-blue.png` is the supplied logo trimmed to its artwork; `assets/logo-white.png` is the reversed version for dark backgrounds.
- The PDFs have no bleed. For commercial printing with full-bleed color, ask the printer for their bleed spec (usually 0.125 in) before sending.

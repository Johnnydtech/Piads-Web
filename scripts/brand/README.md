# Website icons and sharing artwork

Static assets for the marketing site only. The cream/forest palette and Instrument fonts match the site. The favicon uses a script P that stays legible at small sizes. Preview artwork uses the existing Illustrated Stay sample, not customer data.

The PNG cards are 1200 × 630 and the declared metadata includes alt text. The generator has its own card and delivery copy. Versioned filenames avoid reusing stale asset URLs; external services can still cache the page metadata and may need to re-scrape it.

To regenerate after a successful `npm run build`:

1. In a temporary Python virtual environment install `fonttools` and `brotli`.
2. Run `python scripts/brand/generate.py` to outline the site's cached fonts into SVG sources.
3. Run `node scripts/brand/render.mjs` to rasterize, wrap the favicon sizes in ICO, and update legacy aliases.

The social SVGs are background/type layers; the render script adds the original sample artwork as separate image layers. The PNGs are the final sharing assets. No font download or image rendering happens at request time.

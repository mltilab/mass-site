# mass-site

Static informational/marketing site for the MASS platform. **Completely separate from the application** — no build step, no dependencies, no shared code. Plain HTML/CSS/JS.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page — tagline, how-it-works, three feature pillars, education-research positioning |
| `features.html` | Deep dives: Atlas agent, Labeler, Participation Map, collaboration & review |
| `use-cases.html` | Education research (primary), audiences (teams/schools/labs), beyond-education use cases |
| `contact.html` | Demo / early-access request (form is a front-end stub — no backend yet) |

## Structure

- `css/styles.css` — all styles. Design tokens mirror the app theme (`mass-frontend/src/theme/theme.ts`): accent blue `#2196f3`, accent magenta `#f32196`, Poppins headings, Inter body, light `#fafafa` / dark `#242424`.
- `js/main.js` — theme toggle (persisted to `localStorage`, defaults to system preference), mobile nav, reveal-on-scroll, contact-form stub.
- `assets/logo.svg` — placeholder mark (participation-map lanes motif). Replace when real branding exists.
- Product "screenshots" are pure-CSS mockups (`.mock` figures) — swap for real screenshots when the app UI is ready to show.

## Run locally

No server required — open `index.html` directly, or:

```bash
cd mass-site
python3 -m http.server 8088
# → http://localhost:8088
```

## Deploy

Any static host (GitHub Pages, Netlify, Cloudflare Pages, GCS bucket + CDN). Upload the directory as-is.

## Notes / TODO

- The contact form is not wired to anything — connect to a form service or a small endpoint before launch.
- "MASS" is treated as a product name (no acronym expansion); tagline "See how learning happens." is a draft — swap freely.
- Fonts load from Google Fonts; self-host them if that becomes a privacy/deploy concern.

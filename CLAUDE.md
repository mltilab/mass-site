# mass-site — static informational/marketing site for MASS

Plain HTML/CSS/JS. **No build step, no dependencies, no framework.** Open `index.html` in a browser or `python3 -m http.server 8088` from this directory. Deploy = upload the directory to any static host.

This repo is **self-contained on purpose** — it shares no code with the application. You may not have the other MASS repos cloned; everything you need to work on this site accurately is in this file.

## What MASS is (source of truth for copy)

MASS is a **video analysis platform for researchers** — upload observational video, annotate what's happening, and visualize the result as interactive timelines. **Primary audience: education researchers studying how students learn** (classroom observation, engagement coding, group-work dynamics). Secondary framing: the workflow generalizes to anything involving analyzing activity on video (UX research, behavioral studies, sports, workplace studies, animal behavior).

The three product pillars — keep marketing copy grounded in these real capabilities, **don't invent features**:

1. **Atlas (AI agent)** — conversational agent that guides the workflow: organizes projects/datasets/files, and analyzes video to *propose* annotation passes for activities the user describes. **Every consequential action is approval-gated** (agent proposes, user confirms) and **audit-logged**. This human-in-the-loop framing is a core selling point for researchers — preserve it; never describe Atlas as fully autonomous.
2. **The Labeler** — frame-accurate video annotation: bounding boxes with keyframe interpolation, AI click-to-segment masks (include/exclude refinement clicks, tracks subjects through video), multi-subject + multi-pass coding. **Collaborative**: multiple coders on one video with per-subject locks and automatic merging. **Review workflow built in**: submit → review (request changes with notes) → approve/commit as a checkpointed revision. Marketing angle: maps to second-coder / inter-rater practice.
3. **The Participation Map** — annotations rendered as colored segments on interactive multi-lane timelines. Group lanes by student/subject, by activity, or by coding pass; filter by subject/activity/tags; click a segment to jump to that video moment; **saved views** and **shareable read-only links**; notes attached to segments.

Supporting facts usable in copy: dataset roles (Viewer/Editor/Reviewer/Manager), email + in-app notifications for review handoffs, scoped auth + per-resource permissions.

**Copy tone — never frame MASS as monitoring or surveilling students.** Avoid phrasing like "track each student", "quantify when they're focused/distracted", or judgmental coding labels ("off-task") in marketing copy and mockups. Frame everything as understanding participation and learning. (Describing the labeler's technical subject-tracking is fine; aiming that language at students is not.)

Brand: **MASS stands for "Multimodal Analytics Support Studio"** — the full name appears under the wordmark in the header (hidden on mobile) and in the footer copyright line. Tagline *"See how learning happens."* is a draft — fine to iterate. Positioning order: education research first, "beyond education" second.

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing — hero + tagline, how-it-works (3 steps), three pillar cards, education strip, trust strip, CTA |
| `features.html` | Pillar deep dives — anchors `#atlas`, `#labeler`, `#participation-map`, `#collaboration` (linked from index cards) |
| `use-cases.html` | Education research (primary) → audience cards (teams/schools/labs) → beyond-education grid |
| `contact.html` | Demo request form — **front-end stub**, `#contact-form` submit is intercepted in JS, no backend |
| `css/styles.css` | All styles, one file |
| `js/main.js` | Theme toggle, mobile nav, reveal-on-scroll, form stub, footer year |
| `assets/logo.svg` | Placeholder mark (participation-map lanes motif) — also the favicon |

## Conventions (follow these when editing)

**Design tokens** — CSS custom properties at the top of `styles.css`, mirroring the application's theme (the app repo is `mass-frontend`, `src/theme/theme.ts`, but you don't need it — values are duplicated here deliberately):

- Accents: blue `#2196f3` (`--accent`, dim `#c0e4ff` light / `#1e3a4c` dark) and magenta `#f32196` (`--accent2`, dim `#ffc0e4` / `#4c1e38`)
- Surfaces: light `#fafafa` bg / `#ffffff` paper; dark `#242424` bg / `#1a1a1a` paper
- Fonts: **Poppins** headings, **Inter** body, **Chakra Petch** for the MASS wordmark in the header (Google Fonts `<link>` in each page head)
- Radii 4/8/12px. **Never hardcode colors in markup or new rules — use the variables.** Dark mode works by `[data-theme="dark"]` overriding the variables, so any hardcoded hex breaks one of the two modes.

**Theme toggle** — `data-theme` on `<html>`, persisted to `localStorage` key `mass-theme`, defaults to light (system preference is ignored). Each page has an **inline script in `<head>`** setting the attribute before first paint (FOUC guard). If you add a page, copy that script verbatim.

**Shared chrome is duplicated, not templated.** Header/nav and footer are copy-pasted into every page (no includes — that's the price of zero build). When changing nav/footer, **update all four pages** and keep the `is-active` class on the current page's nav link. Same for adding a page: copy an existing page's `<head>`, header, and footer wholesale.

**Buttons**: `.btn--primary` (accent fill, white text) for the one primary action per view; `.btn--outline` (accent border/text) for secondary. Mirrors the app's button rules.

**Product mockups are pure CSS** (`.mock` figures) because no real screenshots exist yet: `.am-*` = participation-map timelines (positioned `.am-seg` spans, animated `.am-playhead`), `.lb-*` = labeler frame (bounding boxes + keyframe diamonds), `.chat__*` = Atlas conversation incl. the `.chat__approval` gate chip. Keep mockup content consistent with the real product (e.g. the approval chip exists because the agent really gates actions). Replace with real screenshots when available — keep `aria-label`s on the figures.

**Misc**: `.reveal` elements fade in via IntersectionObserver (auto-visible if unsupported / reduced-motion). Responsive breakpoints: 900px (grids collapse to 1–2 cols) and 640px (hamburger nav, single column). Honor `prefers-reduced-motion` for any new animation.

## Verify before handing off

No test runner. Check: pages load with no console errors, **both themes** look right (toggle + reload for persistence), mobile width (hamburger opens/closes), nav/footer identical across all four pages, anchor links from index cards land on the right `features.html` sections.

## Known gaps / TODO

- Contact form posts nowhere — wire to a form service or small endpoint before launch.
- `assets/logo.svg` is a placeholder; no real branding exists yet.
- Google Fonts is an external dependency — self-host if privacy/offline becomes a requirement.
- No analytics, sitemap, or OG/social-card images yet (meta descriptions exist).

## Hard rule

This site is **informational only and isolated**: never add references, links, build steps, or imports that reach into the application repos, and never edit sibling repos from here. If product copy needs verifying and the app repos aren't available, ask the team rather than guessing.

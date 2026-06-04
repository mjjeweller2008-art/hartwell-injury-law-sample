# Hartwell Injury Law - Premium PI Portfolio Sample

A **fully working**, multi-page personal injury law firm website for agency portfolio and sales demos. Houston positioning, conversion-focused UX, premium 2026 legal branding.

## Quick start

Images are stored locally in `assets/images/` (32 files) so they load reliably without Unsplash/network issues.

```powershell
Set-Location "c:\Users\01\Desktop\sample website for personal injury lawyer"
npx --yes serve .
```

| URL | Page |
|-----|------|
| `/` | Homepage (full funnel) |
| `/about.html` | Firm story & team |
| `/practice-areas.html` | Practice hub |
| `/car-accident.html` | Service page template |
| `/results.html` | Outcomes & testimonials |
| `/contact.html` | Map, hours, form |
| `/docs/wireframe.html` | UX wireframe (desktop/mobile) |
| `/docs/workflow.md` | Site map & conversion workflow |

Or open `index.html` directly in a browser (use `serve` for best nav/form behavior).

## Project phases

1. **Wireframe** - `docs/wireframe.html` (section blocks, mobile/desktop toggle)
2. **Workflow** - `docs/workflow.md` (Mermaid site map + conversion funnel)
3. **Build** - Design system + 6 live pages + shared header/footer

## Features

- Sticky header with phone + CTA
- Mobile bottom bar: Call Now / Free Case Review
- Short consultation forms (demo submit with confirmation)
- FAQ accordion, scroll reveal (respects reduced motion)
- JSON-LD on homepage
- Favicon, Playfair Display + Inter
- No popups, no sliders

## Structure

```
├── index.html
├── about.html
├── practice-areas.html
├── car-accident.html
├── results.html
├── contact.html
├── css/styles.css, pages.css, wireframe.css
├── js/site-chrome.js, main.js
├── assets/favicon.svg
└── docs/wireframe.html, workflow.md
```

## Client handoff

Replace copy/phone/address, license photos, connect forms to CRM, deploy to Netlify/Vercel, add analytics.

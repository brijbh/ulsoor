# Kolampodu — Tasks & Session Log

## How to Use This File

- Update this file at the START and END of every session.
- If context or usage or token limit is approaching (~2% left), stop dev work, update this file, commit, stop.
- New sessions: read this file first. It is the ground truth for current state.
- Active branch: `main` (kolam-beta was merged)

---

## Current State (as of 2026-06-26, Session 5)

**Branch:** `main` — deployed at `https://ulsoor.vercel.app`

**What works:**
- Diamond/Circle/Square kolam generation — symmetric, unique per seed
- σref-driven gate pre-assignment (0.35–0.75), two-mirror symmetric FTS, 32-attempt loop
- Full animation engine — start / pause / reset / step / speed multiplier
- 3-layer SVG rendering (completed / active / tip glow)
- Light/dark theme toggle (☼/☾), CSS custom properties throughout
- Mobile-first layout fully redesigned — dark dock pattern
- Learn (step-by-step) mode: pause then tap Learn to advance one stroke at a time
- Generate New Pattern → unique kolam every press
- About modal with How to Use help section (7 control explanations, fully up to date)
- OG meta tags: absolute URL, 1200×630 JPEG, correct description length
- Custom favicon.svg (kolam icon, dark red bg, orange path, white dots)
- Tiny wordmark (favicon + KOLAMPODU) at top of canvas on mobile

**Mobile dock (current design):**
- Row 1: shape buttons (◇ ○ □) | − grid + stepper | New Pattern (flex:1) | ⏸ (playing only) | ▶/■
- Row 2: Slow · 1× · Fast (flex pills) | Learn | ☼ | ⓘ
- Light theme → dark dock (#191513). Dark theme → bright cream dock (#ede0c8)
- is-playing: non-playback elements fade to 18%; ⏸ + ■ stay bright; tap canvas to pause
- is-paused: same fade; ▶ dims to 45%; Learn glows orange (is-active) as the focal action
- isStepMode and isImmersive states removed — step mode emerges from pause state via CSS classes
- System-ui font throughout; Georgia only in .about-credit prose

**Triangle shape:** Hidden from UI (`SHAPES` array comment) — aesthetic quality poor, deferred to v1.3

---

## ▶ NEXT SESSION — Resume Here

Three focus areas in order:

1. **Gallery (v1.2)** — Save patterns to `localStorage` as `{seed, shapeId, nd}` (~50 bytes each). Gallery view renders SVG thumbnails on-demand from saved seeds (no images stored). Heart/bookmark button on the canvas to save.

2. **Share (v1.2)** — Copy-to-clipboard URL: `ulsoor.vercel.app/?seed=X&nd=Y&shape=Z`. Anyone who opens the link sees the exact same pattern. No auth needed.

3. **Triangle shape fix (v1.3)** — currently hidden from UI. The projected triangle kolam has straight rail-like sides instead of flowing curves. Needs aesthetic investigation — likely a projection or gate-traversal issue specific to triangular lattice.

---

## Pending / Next Up

### v1.1 — Mobile Polish (complete)
| # | Task | Status |
|---|------|--------|
| 1 | Mobile layout redesign — dark dock | ✅ Done |
| 2 | Step by Step / Learn teaching mode | ✅ Done |
| 3 | Dark theme dock flips to bright cream | ✅ Done |
| 4 | Help section in About modal | ✅ Done |
| 5 | Wordmark at top of canvas | ✅ Done |
| 6 | Grid slider → +/− stepper buttons | ✅ Done |
| 7 | Dock redesign: Learn pill, New Pattern, selective fade | ✅ Done |
| 8 | System-ui font, icon visibility, touch target sizing | ✅ Done |

### v1.2 — Gallery & Share (planned, not started)
| # | Task | Status |
|---|------|--------|
| 8 | Save kolam to gallery (localStorage: `{seed, shapeId, nd}`) | 🔲 TODO |
| 9 | Gallery view — renders SVG thumbnails from saved seeds on-demand | 🔲 TODO |
| 10 | Share URL — `?seed=X&nd=Y&shape=Z` → copy to clipboard | 🔲 TODO |
| 11 | Delete from gallery | 🔲 TODO |

**Gallery design notes (discussed):**
- No auth, no server, no stored images — each pattern = ~50 bytes in localStorage
- Thumbnails generated on-the-fly from seed, never stored
- Cross-device = not supported without auth (acceptable for v1.2)
- Share URL is the bridge: copy link → anyone gets exact same pattern

### v1.3 — Shape Fixes (future)
| # | Task | Status |
|---|------|--------|
| 12 | Triangle aesthetic quality (straight rail-like sides) | 🔲 TODO |
| 13 | Circle projection tuning for larger grids | 🔲 TODO |

---

## Completed ✅

### Phase 1 — Cleanup & Fundamentals
- Removed debug red dots, junk files, unused components
- Seed state + Generate New button → unique kolam per press
- Grid slider styled, handleStep segmentLengths bug fixed
- Dead mobile nav replaced, tablet breakpoint added

### Phase 2 — Pattern Quality
- Two-mirror symmetric FTS (4-pass flip, symmetric gate groups only)
- σref variation per seed (0.35–0.75, sikku ↔ kambi spectrum)
- MAX_MERGE_ATTEMPTS increased 16→32

### Phase 3 — UI & Polish
- Light/dark theme wired (data-theme attribute, CSS custom properties)
- z-index fix for `.desktop-tools` (was intercepted by canvas div)
- All hardcoded rgba values replaced with CSS vars for theming
- Triangle hidden from SHAPES array pending aesthetic fix
- About modal: tribute text + profile link (brijbh.github.io/home)
- Help section added to About: 7 controls explained clearly

### Phase 4 — OG / Social / Favicon
- OG meta tags: og:type, og:url, og:title, og:description, og:image, og:image:width/height
- og-card.jpg: cropped to 1200×630, compressed to 87 KB (was 1.5 MB PNG)
- og:image uses absolute URL `https://ulsoor.vercel.app/og-card.jpg`
- og:description trimmed to 118 chars (was 148)
- apple-touch-icon added
- favicon.svg committed (kolam icon, dark red bg, orange path)
- opengraph.xyz: all issues resolved ✅

### Phase 5 — Mobile Redesign
- Canvas-first layout: kolam fills the screen
- Old topbar/selector/nav replaced by single dark dock
- `Controls` component hidden on mobile (CSS `display: none`)
- Dock: always-contrasting (dark in light mode, cream in dark mode)
- Step by Step mode: isStepMode state, handleSpeedSelect, → button
- Immersive play: dock fades on auto-play, tap canvas to restore
- onCanvasClick prop added to KolamCanvas for immersive dismiss
- Tiny wordmark (favicon + text, 28% opacity) at top of canvas
- kolam-beta merged to main; all pushes to main trigger Vercel deploy

---

## Key Technical Notes (for new sessions)

- `buildKolam({nd, shapeId, seed})` — seed drives σref and gate variation
- Gate matrix always in diamond space; circle/square are projections
- Two-mirror symmetry: `G[i,j] = G[j,i] = G[ND-i,ND-j]`
- σref ≈ 0.6 balanced; >0.7 kambi (open/linear); <0.5 sikku (curvy/dense)
- Target: `Np = Npx = 2(ND²+1)` for one-stroke kolam
- Dock state: CSS classes `.is-playing` / `.is-paused` on `.mobile-dock` — no isImmersive/isStepMode state
- Learn button is-active when `hasAnimationStarted && !isPlaying && progress < 1`
- ⏸ is conditionally rendered (only when isPlaying); New Pattern is flex:1 to absorb the space
- Desktop: side panel + Controls component. Mobile: dark dock replaces both.
- Breakpoints: mobile default, tablet ≥600px, desktop ≥900px

---

## Session Log

### 2026-06-24 — Session 1
- Read all reference docs (dev_brief.md + 5 PDFs), algorithm deep-dive
- Reported understanding of gate matrix, path evolution Eq 6–11, FTS, σref

### 2026-06-24 — Session 2
- Created `kolam-beta` branch
- Phase 1 complete: cleanup, seed/Generate, CSS fixes, tablet breakpoint
- Phase 2 complete: symmetric FTS, σref variation, 32 attempts
- Phase 3 partial: theme wired, triangle hidden, About modal added

### 2026-06-24 — Session 3
- OG meta tags, og-card.jpg (1200×630, 87 KB), favicon.svg committed
- Merged `kolam-beta` → `main`, deployed to Vercel
- opengraph.xyz all issues resolved
- Mobile layout first attempt (grid rows fix)

### 2026-06-24 — Session 4
- Full mobile redesign: dark dock, Step by Step mode, immersive play
- Dark theme dock flips to bright cream (#ede0c8)
- Help section added to About modal
- Wordmark at top of canvas
- Pushed to main → Vercel live
- Gallery feature (v1.2) discussed, design decided, not yet implemented

### 2026-06-26 — Session 5
- Grid slider replaced with +/− stepper buttons (accessibility, dexterity)
- ☼/ⓘ icons enlarged, opacity raised, visible background added
- Georgia serif removed from all UI; system-ui everywhere (Georgia kept in .about-credit)
- Dock restructured: play controls moved to row 1, theme/about to row 2
- Button model simplified: ▶/■ primary toggle, ⏸ secondary (conditional, playing only)
- isStepMode and isImmersive states removed entirely
- Step-by-step replaced by contextual Learn pill in row 2
- Learn glows orange when paused (is-active); fades when playing
- Selective fade: is-playing/is-paused CSS classes replace full-dock opacity
- Canvas tap while playing triggers pause
- All dock elements resized up; New Pattern + speed pills fill space with flex:1
- About modal help updated to match all new controls
- Pushed to main → Vercel live (commit a15825f)

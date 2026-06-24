# Kolampodu — Tasks & Session Log

## How to Use This File

- Update this file at the START and END of every session.
- If context limit is approaching (~2% left), stop dev work, update this file, commit, stop.
- New sessions: read this file first. It is the ground truth for current state.
- Branch for active development: `kolam-beta`

---

## Current State (as of 2026-06-24)

**Branch:** `kolam-beta`

**What actually works:**
- Diamond grid kolam generation (ND=5 tested) via `alkolamEngine.js`
- Full animation engine (`animation.js`) with start/pause/reset/step/speed
- 3-layer SVG rendering (completed / active / tip glow) in `KolamCanvas.jsx`
- Light/dark theme toggle
- Shape selector (diamond, triangle, circle, square) — UI exists, projection quality varies
- Grid size slider in UI (range 3–15)
- Mobile-first layout with one breakpoint at 760px (tablet/desktop)

**What is broken or missing:**
- No seed randomization → same kolam every time for same shape+grid (CRITICAL)
- `grid-slider` CSS class is undefined → slider is unstyled
- Debug red dots visible in production rendering
- Dead nav links (`#home`, `#grids`, `#favorites`)
- No tablet breakpoint — 768px tablets hit desktop layout immediately
- `handleStep` passes empty segmentLengths array (minor bug)

**Junk files to delete:**
- `src/logic/alkolamEngine.js.new`
- `src/logic/alkolamEngine.js.new2`
- `src/logic/alkolamEngine.js.bak`
- `src/App.css` (100% Vite default boilerplate, unused)

---

## Active Session Tasks

### PHASE 1 — Cleanup & Fix Fundamentals (kolam-beta branch)

| # | Task | Status | Priority |
|---|------|--------|----------|
| 1 | Delete junk files (.new, .new2, .bak, App.css) | ⬜ TODO | High |
| 2 | Remove debug red dots from KolamCanvas | ⬜ TODO | High |
| 3 | Remove AlkolamSandbox.jsx (unused dev file) | ⬜ TODO | Medium |
| 4 | Add seed state + Generate button → new kolam per press | ⬜ TODO | CRITICAL |
| 5 | Add CSS for grid-slider (unstyled range input) | ⬜ TODO | High |
| 6 | Fix handleStep empty segmentLengths bug | ⬜ TODO | Low |
| 7 | Remove dead mobile nav links or wire them properly | ⬜ TODO | Medium |
| 8 | Add tablet breakpoint (~900px) for mid-size screens | ⬜ TODO | High |
| 9 | Commit + push after above complete | ⬜ TODO | High |

### PHASE 2 — Pattern Quality (next session or later this session)

| # | Task | Status | Priority |
|---|------|--------|----------|
| 10 | Enforce two-mirror symmetry in gate matrix | ⬜ TODO | High |
| 11 | Increase FTS attempts for larger ND (currently 16, try 32–50) | ⬜ TODO | Medium |
| 12 | Add σref variation per Generate press (vary aesthetic style) | ⬜ TODO | Medium |
| 13 | Audit rendering quality for ND=7, ND=9, ND=11 | ⬜ TODO | High |

### PHASE 3 — Shape Generalization (future)

| # | Task | Status | Priority |
|---|------|--------|----------|
| 14 | Triangle aesthetic quality (currently rail-like straight sides) | ⬜ TODO | Medium |
| 15 | Circle projection tuning for larger grids | ⬜ TODO | Low |
| 16 | Square projection tuning | ⬜ TODO | Low |

---

## Completed ✅

- [x] Algorithm research & math understanding (gate matrix, path evolution Eq 6–11)
- [x] Diamond grid stabilization (ND=5 one-stroke path)
- [x] Smooth Bézier spline rendering (midpoint-to-midpoint quadratic)
- [x] Animation engine with start/pause/reset/step/speed
- [x] 3-layer SVG drawing effect (completed / active / tip)
- [x] Dot glow near leading edge
- [x] Shape selector UI
- [x] Light/dark theme toggle
- [x] Mobile-first layout (single breakpoint at 760px)
- [x] Canonical projection (diamond algo → project for other shapes)

---

## Key Technical Notes (for new sessions)

- `buildKolam({nd, shapeId, seed})` — seed controls pattern variety. Missing seed = same kolam always.
- Gate matrix always computed in diamond space; other shapes are projections.
- `alkolamEngine.js` is the JS port of Python `KolamDraw` class from doc 03 (academic paper).
- Two-mirror symmetry: `G[i,j] = G[j,i] = G[ND-i,ND-j]` = most aesthetically correct kolams.
- σref ≈ 0.6 → balanced. >0.7 → kambi (linear). 0.4–0.6 → sikku (curved/interlocked).
- Target: `Np = Npx = 2(ND²+1)` for a complete one-stroke kolam.
- Mobile breakpoint: 760px. Tablet gap: 760–900px needs its own layout tier.

---

## Session Log

### 2026-06-24 — Session 2
- Branch `kolam-beta` created
- Full codebase audit completed
- tasks.md rewritten with current ground truth
- Immediate action list identified (Phase 1, tasks 1–9)
- Awaiting confirmation to proceed with Phase 1 implementation

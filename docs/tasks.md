# Kolampodu — Tasks & Session Log

## How to Use This File

- Update this file at the START and END of every session.
- If context or usage or token limit is approaching (~2% left), stop dev work, update this file, commit, stop.
- New sessions: read this file first. It is the ground truth for current state.
- Branch for active development: `kolam-beta`

---

## Current State (as of 2026-06-24)

**Branch:** `kolam-beta`

**What actually works:**
- Diamond grid kolam generation via `alkolamEngine.js` — symmetric, varied per seed
- σref-driven gate pre-assignment (0.35–0.75 range) — aesthetic variety per seed
- Two-mirror symmetric FTS with 4-pass flip algorithm
- 32-attempt convergence loop (up from 16)
- Full animation engine (`animation.js`) with start/pause/reset/step/speed
- 3-layer SVG rendering (completed / active / tip glow) in `KolamCanvas.jsx`
- Light/dark theme toggle
- Shape selector (diamond, triangle, circle, square) — UI exists, projection quality varies
- Grid size slider in UI (range 3–15), styled
- Seed state + Generate New button → unique kolam per press
- Mobile-first layout: phone (<600px), tablet (600–899px), desktop (900px+)

**Needs visual audit (user to verify on device):**
- Diamond ND=7, ND=9, ND=11 rendering quality
- Tablet layout at 768px (portrait iPad)
- Mobile Generate button placement and feel
- Shape projections (triangle, circle, square) at various ND

---

## Active Session Tasks

### PHASE 1 — Cleanup & Fix Fundamentals ✅ COMPLETE

| # | Task | Status |
|---|------|--------|
| 1 | Delete junk files (.new, .new2, .bak, App.css) | ✅ Done |
| 2 | Remove debug red dots from KolamCanvas | ✅ Done |
| 3 | Remove AlkolamSandbox.jsx (unused dev file) | ✅ Done |
| 4 | Add seed state + Generate button → new kolam per press | ✅ Done |
| 5 | Add CSS for grid-slider (unstyled range input) | ✅ Done |
| 6 | Fix handleStep empty segmentLengths bug | ✅ Done |
| 7 | Remove dead mobile nav links or wire them properly | ✅ Done |
| 8 | Add tablet breakpoint (~900px) for mid-size screens | ✅ Done |
| 9 | Commit + push | ✅ Done |

### PHASE 2 — Pattern Quality ✅ COMPLETE

| # | Task | Status |
|---|------|--------|
| 10 | Enforce two-mirror symmetry in gate matrix | ✅ Done |
| 11 | Increase FTS attempts 16→32, 4-pass flip per attempt | ✅ Done |
| 12 | Add σref variation per seed (0.35–0.75, sikku↔kambi) | ✅ Done |
| 13 | Build verified clean; visual audit needed by user on device | ⚠️ User |

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
- [x] Mobile-first layout: phone / tablet (600px) / desktop (900px)
- [x] Canonical projection (diamond algo → project for other shapes)
- [x] Seed randomization + Generate New button
- [x] Two-mirror symmetric FTS (4-pass flip, symmetric gate groups only)
- [x] σref variation per seed — aesthetic variety (sikku ↔ kambi)
- [x] MAX_MERGE_ATTEMPTS increased 16→32
- [x] Grid slider styled, handleStep bug fixed, dead nav replaced

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
- Phase 1 complete: cleanup, seed/Generate, CSS fixes, tablet breakpoint
- Phase 2 complete: symmetric FTS, σref variation, 32 attempts
- Build passes clean; visual audit on device needed by user
- Next: Phase 3 (shape generalization) or visual audit feedback first

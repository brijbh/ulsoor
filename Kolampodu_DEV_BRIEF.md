# Kolampodu — Development Brief (Extended)

---

# 1. Project Overview

Kolampodu is a **mobile-first web application** that provides a **calm, guided experience** for learning and drawing kolams (South Indian floor art).

This is NOT a drawing tool.

This is a **guided visual system**:

- User selects a dot grid
- Presses Play
- Watches kolam being drawn step-by-step

---

# 2. Core Product Principles

1. Canvas is the hero  
2. One primary action: Play  
3. Calm + minimal UI  
4. No clutter  
5. Separation of concerns is mandatory  

---

# 3. Technology Stack

- React (Vite)
- SVG rendering
- No backend

---

# 4. System Architecture

The system has **3 independent layers**:

### 4.1 UI Layer
- React components
- Controls
- Layout

### 4.2 Algorithm Layer (CRITICAL)
- Gate matrix
- Traversal logic
- Loop generation

### 4.3 Geometry Layer (IN PROGRESS)
- Converts traversal → kolam curves
- Responsible for visual correctness

---

# 5. Algorithm Source of Truth

The kolam generation logic is based on:

- Alkolam GitHub.ipynb
- An Algorithm for One-Stroke Kolam Generation Using (PDF)

---

# 6. Algorithm Model

## Grid Representation
- Square grid (nd × nd)
- Dots at integer coordinates
- Gates between cells

## Gate Matrix
- OPEN (1)
- CLOSED (0)
- Symmetry enforced

## Traversal
- nextStep() determines movement

## Loop Generation
- runPath() produces closed loop

## Optimization
- improveGates() refines loop

---

# 7. Critical Insight

Traversal path ≠ Kolam drawing

Traversal gives topology  
Kolam requires geometry

---

# 8. Current Status

## Completed
- Algorithm logic
- Loop generation

## Missing
- Geometry conversion
- Dot wrapping logic

---

# 9. Current Issues

- Rendering disconnected from algorithm
- Path does not wrap dots
- Coordinate mismatch
- Lack of visual debugging

---

# 10. Target System

A correct kolam must:

- Be one continuous loop
- Not cross dots
- Wrap around dots
- Maintain symmetry
- Use smooth curves

---

# 11. Development Strategy

## Phase A — Stabilization
- Square grid only
- Debug visibility

## Phase B — Geometry Bridge
Convert traversal → curves

## Phase C — Animation

## Phase D — Shape Expansion

---

# 12. Debug Strategy

Visual + Console debugging

---

# 13. Engineering Rules

- Do not mix logic and UI
- Do not fake rendering
- Algorithm drives geometry

---

# 14. Codex Instructions

- Follow algorithm strictly
- Do not shortcut
- Build geometry layer properly

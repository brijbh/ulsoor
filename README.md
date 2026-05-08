# Kolampodu

A digital **Pulli Kolam** generation and guided drawing tool — experience the beauty of South Indian floor art, one stroke at a time.

![kolampodu](https://img.shields.io/badge/kolam-pulli_kolam-orange)
![react](https://img.shields.io/badge/react-19-blue)
![vite](https://img.shields.io/badge/vite-8-purple)
![license](https://img.shields.io/badge/license-private-lightgrey)

---

## ✨ What is Kolampodu?

Kolampodu is a **mobile-first web application** that provides a **calm, guided experience** for learning and drawing kolams. It is not a freehand drawing tool — it is a **visual meditation** where you:

1. Select a dot grid pattern
2. Press **Play ▶**
3. Watch the kolam being drawn step-by-step in a single continuous stroke

The project implements the **Alkolam algorithm** for generating one-stroke kolam paths around anchor dots, based on academic research on gate traversal methods.

---

## 🎨 Features

- **One-stroke kolam generation** — Algorithmically generates continuous, closed kolam paths using the Alkolam gate traversal method
- **Multiple shapes** — Diamond, Square, Circle, and Triangle kolam patterns
- **Animated drawing** — Watch the kolam being drawn progressively with smooth SVG animation
- **Playback controls** — Play, Pause, and Reset with adjustable speed and step controls
- **Grid size selector** — Adjust the dot grid density
- **Theme switching** — Multiple visual themes
- **Mobile-first design** — Calm, minimal UI with the canvas as the hero element
- **Responsive layout** — Works beautifully on both mobile and desktop viewports

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/brijbh/kolampodu.git
cd kolampodu

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
# Create a production build
npm run build

# Preview the production build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 🏗️ Project Structure

```
kolampodu/
├── docs/                        # Research & reference material
│   ├── Alkolam GitHub.ipynb     # Algorithm notebook
│   ├── An_algorithm_for_...pdf  # Academic paper
│   ├── dev_brief.md             # Development brief
│   └── tasks.md                 # Task tracking
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── Header.jsx           # App header
│   │   ├── KolamCanvas.jsx      # SVG canvas renderer
│   │   ├── Controls.jsx         # Playback controls
│   │   └── AlkolamSandbox.jsx   # Algorithm sandbox
│   ├── logic/
│   │   ├── alkolamEngine.js     # Core Alkolam path engine
│   │   ├── kolam.js             # Kolam path utilities
│   │   ├── grid.js              # Dot grid generation
│   │   ├── animation.js         # Animation engine
│   │   └── bounds.js            # Boundary calculations
│   ├── styles/
│   │   ├── base.css             # Base styles
│   │   ├── layout.css           # Layout styles
│   │   └── theme.css            # Theme variables
│   ├── App.jsx                  # Root application component
│   ├── App.css                  # App styles
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html                   # HTML entry point
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies & scripts
└── MEMORY.md                    # Project memory / context
```

---

## 🧠 How It Works

The core engine uses the **Alkolam algorithm** to generate one-stroke kolam paths:

1. **Canonical Path Generation** — The engine computes a canonical traversal using `shapeId = "diamond"` as the base
2. **Shape Projection** — Dots and path points are projected into the requested shape (square, circle, triangle) via `projectKolamPoint()`
3. **SVG Rendering** — The path is rendered as a continuous SVG stroke on the canvas
4. **Progressive Animation** — The stroke is revealed progressively using `stroke-dasharray` / `stroke-dashoffset`

This ensures all shapes maintain:
- ✅ All dots covered/engulfed
- ✅ Single continuous closed path
- ✅ No path outside the visible grid boundary
- ✅ Smooth, organic curves

---

## 🛠️ Tech Stack

| Layer      | Technology        |
|------------|-------------------|
| Framework  | React 19          |
| Bundler    | Vite 8            |
| Rendering  | SVG               |
| Styling    | Vanilla CSS       |
| Linting    | ESLint 10         |
| Backend    | None (client-only)|

---

## 🗺️ Roadmap

| Phase   | Features                                       | Status       |
|---------|-------------------------------------------------|-------------|
| Phase 1 | Layout, animation engine, playback controls     | ✅ Complete  |
| Phase 2 | Multiple grid selection, real kolam patterns     | 🔜 Planned  |
| Phase 3 | Practice mode (user draws), stroke validation    | 📋 Future   |
| Phase 4 | Kolam generator (rule-based), save/favorites     | 📋 Future   |
| Phase 5 | Backend (user data), community sharing           | 📋 Future   |

---

## 📚 References

- [An Algorithm for One-Stroke Kolam Generation](docs/An_algorithm_for_one-stroke_kolam_generation_using.pdf) — Academic paper on the Alkolam gate traversal method
- [Alkolam Notebook](docs/Alkolam%20GitHub.ipynb) — Jupyter notebook with algorithm implementation

---

## 🤝 Contributing

Contributions are welcome! Please read the [development brief](docs/dev_brief.md) before making changes.

**Engineering rules:**
1. Do NOT mix logic with UI
2. Do NOT use inline styles unless absolutely necessary
3. Keep animation logic separate from rendering
4. Do NOT introduce external UI libraries
5. Keep code minimal and readable

---

## 📄 License

This is a private project.

---

<p align="center">
  <em>Drawing kolams, one stroke at a time 🪷</em>
</p>

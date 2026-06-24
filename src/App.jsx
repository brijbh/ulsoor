import { useState, useMemo, useEffect, useRef, useCallback } from "react";

import Header from "./components/Header";
import KolamCanvas from "./components/KolamCanvas";
import Controls from "./components/Controls";

import { createKolamAnimation } from "./logic/animation";
import { buildKolam } from "./logic/alkolamEngine";

import "./styles/base.css";
import "./styles/layout.css";
import "./styles/theme.css";

const SHAPES = [
  { id: "diamond", label: "Diamond" },
  { id: "circle", label: "Circle" },
  { id: "square", label: "Square" },
  // { id: "triangle", label: "Triangle" }, // hidden pending aesthetic fix
];

function ShapeSelector({ selectedShape, onSelectShape }) {
  return (
    <section className="selector-group" aria-label="Shape selector">
      <p className="section-label">Select Shape</p>
      <div className="shape-options">
        {SHAPES.map((shape) => (
          <button
            key={shape.id}
            className="shape-button"
            type="button"
            aria-label={shape.label}
            aria-pressed={shape.id === selectedShape}
            onClick={() => onSelectShape(shape.id)}
          >
            <span className={`shape-icon shape-icon-${shape.id}`} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}

function GridSelector({ gridSize, onSelectGrid }) {
  const [localSize, setLocalSize] = useState(gridSize);

  return (
    <section className="selector-group" aria-label="Grid selector">
      <p className="section-label">Grid Size</p>
      <div className="grid-options">
        <input
          type="range"
          min="3"
          max="15"
          value={localSize}
          onChange={(e) => {
            const size = parseInt(e.target.value);
            setLocalSize(size);
            onSelectGrid(size);
          }}
          className="grid-slider"
        />
        <span className="grid-size-label">{localSize}x{localSize}</span>
      </div>
    </section>
  );
}

function getRenderedPattern(dots) {
  const sortedDots = [...dots].sort((a, b) => a.y - b.y);
  const rows = [];

  for (const dot of sortedDots) {
    const row = rows[rows.length - 1];

    if (!row || Math.abs(row.y - dot.y) > 1) {
      rows.push({
        y: dot.y,
        count: 1,
      });
    } else {
      row.count += 1;
    }
  }

  return rows.map((row) => row.count);
}

function randomSeed() {
  return Math.floor(Math.random() * 0xffffff);
}

export default function App() {
  const [selectedShape, setSelectedShape] = useState("diamond");
  const [gridSize, setGridSize] = useState(5);
  const [seed, setSeed] = useState(() => randomSeed());

  const shape = SHAPES.find(({ id }) => id === selectedShape) ?? SHAPES[0];
  
  const getPattern = (id, nd) => {
    if (id === "diamond") {
      const p = [];
      for (let i = 1; i <= nd; i += 1) p.push(i);
      for (let i = nd - 1; i >= 1; i -= 1) p.push(i);
      return p;
    }
    if (id === "triangle") {
      const p = [];
      for (let i = 1; i <= nd; i += 1) p.push(i);
      return p;
    }
    if (id === "square") {
      return Array(nd).fill(nd);
    }
    if (id === "circle") {
      // Approximate circular pattern label
      if (nd === 3) return [1, 3, 1];
      if (nd === 5) return [3, 5, 5, 5, 3];
      if (nd === 7) return [3, 5, 7, 7, 7, 5, 3];
      return [nd];
    }
    return [nd];
  };

  const kolam = useMemo(() => {
    return buildKolam({ nd: gridSize, shapeId: shape.id, seed });
  }, [shape.id, gridSize, seed]);
  const pattern = shape.id === "diamond"
    ? getPattern(shape.id, gridSize)
    : getRenderedPattern(kolam.dots);
  const gridLabel = pattern.join(" - ");

  const animationRef = useRef(null);
  const segmentLengthsRef = useRef([]);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [theme, setTheme] = useState("light");
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    animationRef.current = createKolamAnimation({
      onProgress: setProgress,
      onComplete: () => setIsPlaying(false),
    });

    return () => {
      animationRef.current?.pause();
    };
  }, []);

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    animationRef.current?.updateOptions({ speedMultiplier: newSpeed });
  };

  const handlePlay = () => {
    if (animationRef.current?.progress >= 1) {
      animationRef.current.reset();
    }

    animationRef.current?.start();
    setIsPlaying(true);
    setHasAnimationStarted(true);
  };

  const handlePause = () => {
    animationRef.current?.pause();
    setIsPlaying(false);
  };

  const handleReset = () => {
    animationRef.current?.reset();
    setIsPlaying(false);
    setHasAnimationStarted(false);
  };

  const handleStep = () => {
    if (animationRef.current) {
      animationRef.current.stepForward(kolam.segments, segmentLengthsRef.current, kolam.dots);
      setHasAnimationStarted(true);
    }
  };

  const resetAnimation = useCallback(() => {
    animationRef.current?.reset();
    setIsPlaying(false);
    setHasAnimationStarted(false);
  }, []);

  const handleGenerate = useCallback(() => {
    setSeed(randomSeed());
    resetAnimation();
  }, [resetAnimation]);

  const handleSelectShape = (shapeId) => {
    setSelectedShape(shapeId);
    resetAnimation();
  };

  const handleSelectGridSize = (size) => {
    setGridSize(size);
    resetAnimation();
  };

  return (
    <div className="page">
      <aside className="side-panel">
        <Header />
        <ShapeSelector
          selectedShape={selectedShape}
          onSelectShape={handleSelectShape}
        />
        <GridSelector
          selectedShape={selectedShape}
          gridSize={gridSize}
          onSelectGrid={handleSelectGridSize}
        />
        <div className="pattern-preview">
          <p className="section-label">Pattern</p>
          <p className="pattern-label">{gridLabel}</p>
        </div>
        <button className="generate-button" type="button" onClick={handleGenerate}>
          Generate New
        </button>
        <p className="side-note">A kolam a day,<br />brings peace<br />in every way.</p>
        <button className="about-link" type="button" onClick={() => setShowAbout(true)}>
          About
        </button>
      </aside>
      <main className="canvas-area" aria-label="Kolam drawing area">
        <div className="desktop-tools" aria-label="Display options">
          <button className="icon-button" type="button" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === "light" ? "☼" : "☾"}
          </button>
        </div>
        <div className="mobile-topbar" aria-label="Mobile header">
          <button className="icon-button" type="button" aria-label="About" onClick={() => setShowAbout(true)}>ⓘ</button>
          <Header />
          <button className="icon-button" type="button" aria-label="Theme" onClick={toggleTheme}>
            {theme === "light" ? "☼" : "☾"}
          </button>
        </div>
        <div className="mobile-selector">
          <ShapeSelector
            selectedShape={selectedShape}
            onSelectShape={handleSelectShape}
          />
          <GridSelector
            selectedShape={selectedShape}
            gridSize={gridSize}
            onSelectGrid={handleSelectGridSize}
          />
          <p className="mobile-pattern-label">Grid: {gridLabel}</p>
        </div>
        
        <KolamCanvas
          dots={kolam.dots}
          path={kolam.pathD}
          segments={kolam.segments}
          progress={progress}
          showHint={!hasAnimationStarted}
          onSegmentLengths={(lengths) => { segmentLengthsRef.current = lengths; }}
        />

        <Controls
          isPlaying={isPlaying}
          progress={progress}
          speed={speed}
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
          onStep={handleStep}
          onSpeedChange={handleSpeedChange}
        />

        <div className="mobile-nav">
          <button className="generate-button" type="button" onClick={handleGenerate}>
            Generate New
          </button>
        </div>
      </main>

      {showAbout && (
        <div className="about-overlay" role="dialog" aria-modal="true" aria-label="About Kolampodu" onClick={() => setShowAbout(false)}>
          <div className="about-modal" onClick={(e) => e.stopPropagation()}>
            <button className="about-close" type="button" aria-label="Close" onClick={() => setShowAbout(false)}>✕</button>

            <p className="about-app-name">Kolampodu</p>
            <p className="about-tagline">A guided kolam drawing experience</p>

            <p className="about-body">
              Kolam is a 5,000-year-old South Indian art form, drawn with rice flour
              around a grid of dots called <em>pullis</em>. The most revered form is the
              one-stroke kolam — the entire pattern drawn in a single unbroken line.
            </p>
            <p className="about-body">
              Every kolam here is algorithmically generated — gate matrices, symmetric
              path evolution, and aesthetic parameters from a peer-reviewed 2026 paper.
              No two patterns are the same.
            </p>

            <ul className="about-features">
              <li>▶ Play to watch it draw itself</li>
              <li>⟳ Generate New for a fresh pattern</li>
              <li>Slow / Normal / Fast drawing speed</li>
              <li>Light and dark theme</li>
            </ul>

            <div className="about-footer">
              <p className="about-credit">
                An ode to an ancient wisdom — kolam wove sacred geometry into rice
                flour at the doorstep, every single day, for 5,000 years. It taught
                us that mathematics is not a discipline. It is devotion, drawn at
                the threshold.
              </p>
              <a
                className="about-profile-link"
                href="https://brijbh.github.io/home/"
                target="_blank"
                rel="noopener noreferrer"
              >
                brijbh.github.io/home →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

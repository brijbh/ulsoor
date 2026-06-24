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
  const [isImmersive, setIsImmersive] = useState(false);
  const [isStepMode, setIsStepMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    animationRef.current = createKolamAnimation({
      onProgress: setProgress,
      onComplete: () => { setIsPlaying(false); setIsImmersive(false); },
    });

    return () => {
      animationRef.current?.pause();
    };
  }, []);

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    animationRef.current?.updateOptions({ speedMultiplier: newSpeed });
  };

  const handleSpeedSelect = (value) => {
    if (value === "step") {
      setIsStepMode(true);
      if (isPlaying) {
        animationRef.current?.pause();
        setIsPlaying(false);
        setIsImmersive(false);
      }
    } else {
      setIsStepMode(false);
      setSpeed(value);
      animationRef.current?.updateOptions({ speedMultiplier: value });
    }
  };

  const handlePlay = () => {
    if (animationRef.current?.progress >= 1) {
      animationRef.current.reset();
    }

    animationRef.current?.start();
    setIsPlaying(true);
    setHasAnimationStarted(true);
    if (!isStepMode) setIsImmersive(true);
  };

  const handlePause = () => {
    animationRef.current?.pause();
    setIsPlaying(false);
    setIsImmersive(false);
  };

  const handleReset = () => {
    animationRef.current?.reset();
    setIsPlaying(false);
    setHasAnimationStarted(false);
    setIsImmersive(false);
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
    setIsImmersive(false);
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
        <KolamCanvas
          dots={kolam.dots}
          path={kolam.pathD}
          segments={kolam.segments}
          progress={progress}
          showHint={!hasAnimationStarted}
          onSegmentLengths={(lengths) => { segmentLengthsRef.current = lengths; }}
          onCanvasClick={() => { if (isImmersive) setIsImmersive(false); }}
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

        {/* Subtle brand identity at top of canvas */}
        <div className="canvas-wordmark" aria-hidden="true">
          <img src="/favicon.svg" className="wordmark-icon" alt="" />
          <span className="wordmark-text">KOLAMPODU</span>
        </div>

        {/* Dark control dock */}
        <div className={`mobile-dock${isImmersive ? " is-immersive" : ""}`} aria-label="Controls">
          {/* Row 1 — shape, grid, icons, generate */}
          <div className="dock-row">
            <div className="dock-shapes">
              {SHAPES.map((s) => (
                <button
                  key={s.id}
                  className={`dock-shape-btn${s.id === selectedShape ? " is-active" : ""}`}
                  type="button"
                  aria-label={s.label}
                  aria-pressed={s.id === selectedShape}
                  onClick={() => handleSelectShape(s.id)}
                >
                  <span className={`shape-icon shape-icon-${s.id}`} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="dock-sep" aria-hidden="true" />
            <div className="dock-grid-control">
              <input
                type="range"
                min="3"
                max="15"
                value={gridSize}
                className="grid-slider"
                onChange={(e) => handleSelectGridSize(parseInt(e.target.value))}
                aria-label="Grid size"
              />
              <span className="dock-grid-label">{gridSize}×{gridSize}</span>
            </div>
            <div className="dock-sep" aria-hidden="true" />
            <button className="dock-icon-btn" type="button" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === "light" ? "☼" : "☾"}
            </button>
            <button className="dock-icon-btn" type="button" aria-label="About" onClick={() => setShowAbout(true)}>
              ⓘ
            </button>
            <button className="dock-new-btn" type="button" aria-label="Generate new pattern" onClick={handleGenerate}>
              ⟳ New
            </button>
          </div>

          {/* Row 2 — speed mode + play controls */}
          <div className="dock-row">
            <div className="dock-speeds">
              {[{ l: "Slow", v: 0.5 }, { l: "1×", v: 1 }, { l: "Fast", v: 2 }].map(({ l, v }) => (
                <button
                  key={v}
                  className={`dock-speed-pill${!isStepMode && speed === v ? " is-active" : ""}`}
                  type="button"
                  onClick={() => handleSpeedSelect(v)}
                >
                  {l}
                </button>
              ))}
              <button
                className={`dock-speed-pill dock-speed-step${isStepMode ? " is-active" : ""}`}
                type="button"
                onClick={() => handleSpeedSelect("step")}
              >
                Step by Step
              </button>
            </div>
            <div className="dock-playcontrols">
              <button
                className="dock-ctrl-btn"
                type="button"
                aria-label="Reset"
                disabled={!hasAnimationStarted}
                onClick={handleReset}
              >
                ↺
              </button>
              {isStepMode ? (
                <button
                  className="dock-ctrl-btn dock-ctrl-primary"
                  type="button"
                  aria-label="Step forward"
                  disabled={progress >= 1}
                  onClick={handleStep}
                >
                  →
                </button>
              ) : isPlaying ? (
                <button
                  className="dock-ctrl-btn dock-ctrl-primary"
                  type="button"
                  aria-label="Pause"
                  onClick={handlePause}
                >
                  Ⅱ
                </button>
              ) : (
                <button
                  className="dock-ctrl-btn dock-ctrl-primary"
                  type="button"
                  aria-label="Play"
                  onClick={handlePlay}
                >
                  ▶
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {showAbout && (
        <div className="about-overlay" role="dialog" aria-modal="true" aria-label="About Kolampodu" onClick={() => setShowAbout(false)}>
          <div className="about-modal" onClick={(e) => e.stopPropagation()}>
            <button className="about-close" type="button" aria-label="Close" onClick={() => setShowAbout(false)}>✕</button>

            <p className="about-app-name">Kolampodu</p>
            <p className="about-tagline">A guided kolam drawing experience</p>

            <p className="about-body">
              Kolam is a 5,000-year-old South Indian art form drawn with rice flour around
              a grid of dots called <em>pullis</em>. The most revered form is the one-stroke
              kolam — an entire pattern in a single unbroken line. Every kolam here is
              algorithmically unique, generated fresh each time.
            </p>

            <div className="about-help">
              <p className="about-help-title">How to use</p>
              <ul className="about-help-list">
                <li>
                  <span className="help-key">◇ ○ □</span>
                  <span className="help-desc">Pick the kolam family — Diamond, Circle, or Square. Each has its own geometry.</span>
                </li>
                <li>
                  <span className="help-key">Grid slider</span>
                  <span className="help-desc">Sets the dot grid from 3×3 to 15×15. Larger grids make richer, more intricate patterns.</span>
                </li>
                <li>
                  <span className="help-key">⟳ New</span>
                  <span className="help-desc">Generates a completely new kolam. Tap as many times as you like — no two are ever the same.</span>
                </li>
                <li>
                  <span className="help-key">Slow · 1× · Fast</span>
                  <span className="help-desc">Auto-play the drawing at your pace. Controls fade for a clean view — tap the canvas to bring them back.</span>
                </li>
                <li>
                  <span className="help-key">Step by Step</span>
                  <span className="help-desc">Teaching mode. Tap → to draw one stroke at a time and watch the pattern build segment by segment.</span>
                </li>
                <li>
                  <span className="help-key">▶ · ↺</span>
                  <span className="help-desc">Play starts the drawing. Reset starts it over from the beginning.</span>
                </li>
                <li>
                  <span className="help-key">☼ · ☾</span>
                  <span className="help-desc">Switch between light and dark themes.</span>
                </li>
              </ul>
            </div>

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

import { useMemo } from "react";
import { buildKolam } from "../logic/alkolamEngine";
import { getViewBoxBounds } from "../logic/bounds";
import ShareIcon from "./ShareIcon";

export default function KolamThumbnail({ seed, nd, shapeId, onClick, onShare, onDelete }) {
  const kolam = useMemo(() => buildKolam({ nd, shapeId, seed }), [nd, shapeId, seed]);
  const bounds = getViewBoxBounds({ dots: kolam.dots, segments: kolam.segments, padding: 20 });
  const w = bounds.maxX - bounds.minX;
  const h = bounds.maxY - bounds.minY;

  return (
    <div className="gallery-thumb">
      <div className="gallery-thumb-canvas" onClick={onClick} role="button" tabIndex={0} aria-label={`${shapeId} ${nd}×${nd} kolam`}>
        <svg viewBox={`0 0 ${w} ${h}`} className="gallery-thumb-svg" aria-hidden="true">
          <g transform={`translate(${-bounds.minX} ${-bounds.minY})`}>
            {kolam.dots.map((dot, i) => (
              <circle key={i} cx={dot.x} cy={dot.y} r={3} className="gallery-dot" />
            ))}
            <path d={kolam.pathD} className="gallery-path" />
          </g>
        </svg>
      </div>
      <div className="gallery-thumb-actions">
        <button type="button" className="gallery-action-btn" aria-label="Share this kolam" onClick={onShare}><ShareIcon size={15} /></button>
        <button type="button" className="gallery-action-btn gallery-delete-btn" aria-label="Delete" onClick={onDelete}>×</button>
      </div>
    </div>
  );
}

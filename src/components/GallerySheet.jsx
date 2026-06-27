import KolamThumbnail from "./KolamThumbnail";

export default function GallerySheet({ gallery, onLoad, onShare, onDelete, onClose }) {
  return (
    <div className="gallery-overlay" role="dialog" aria-modal="true" aria-label="Saved kolams" onClick={onClose}>
      <div className="gallery-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-sheet-header">
          <p className="gallery-sheet-title">Saved Kolams</p>
          <button className="gallery-close" type="button" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <p className="gallery-note">Saved on this device only · Share a link to open anywhere</p>
        {gallery.length === 0 ? (
          <p className="gallery-empty">No kolams saved yet.<br />Tap ♡ to save or the share icon to save and share.</p>
        ) : (
          <div className="gallery-grid">
            {gallery.map((item, i) => (
              <KolamThumbnail
                key={`${item.seed}-${item.shapeId}-${item.nd}-${i}`}
                seed={item.seed}
                nd={item.nd}
                shapeId={item.shapeId}
                onClick={() => onLoad(item)}
                onShare={() => onShare(item)}
                onDelete={() => onDelete(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

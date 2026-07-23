/**
 * Fixed, full-viewport SVG noise overlay giving the flat background canvas
 * an editorial, tactile paper feel. Sits above content but below the
 * scroll-progress bar (z-50) and cursor bubble (z-60), and below modals
 * (z-100), so it never intercepts clicks or sits on top of UI chrome.
 */
export default function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.035] mix-blend-multiply">
      <svg width="100%" height="100%">
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
}

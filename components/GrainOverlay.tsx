/**
 * Fixed, full-viewport SVG noise overlay giving the deep charcoal canvas a
 * soft, tactile paper-grain feel.
 *
 * Note: this deliberately does NOT use `mix-blend-mode: overlay`. Overlay
 * blending darkens wherever the base color is below 50% brightness and
 * lightens wherever it's above — on a near-black base like #0B0B0C there's
 * nothing left to darken, so the noise gets crushed to invisible no matter
 * how strong it is. Instead, the turbulence output drives the *alpha*
 * channel of a fixed warm-white color directly (feColorMatrix maps R/G/B to
 * constants and passes the noise through as alpha), so it composites
 * normally as faint light specks — visible on any background, dark or
 * light — rather than depending on blend-mode math.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.22]"
    >
      <svg width="100%" height="100%">
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves={2}
            stitchTiles="stitch"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.5" result="softNoise" />
          {/* Fix R/G/B to a muted warm tone, pass turbulence through as alpha */}
          <feColorMatrix
            in="softNoise"
            type="matrix"
            values="0 0 0 0 0.55
                    0 0 0 0 0.50
                    0 0 0 0 0.44
                    0 0 0 0.35 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
}
/**
 * Fixed, full-viewport dot-grid overlay covering the deep charcoal canvas —
 * a sharp, structured technical texture instead of a blurred noise/grain
 * overlay. Sits above the base background but below content, the
 * scroll-progress bar (z-50), and the cursor bubble (z-60).
 */
export default function BackgroundPattern() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(226,184,131,0.16) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    />
  );
}
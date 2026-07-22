export default function TechPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-white/60 transition-colors group-hover:border-white/20 group-hover:text-white/80">
      {label}
    </span>
  );
}
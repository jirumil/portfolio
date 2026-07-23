export default function TechPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-primary/20 bg-background px-2.5 py-1 font-mono text-[11px] text-navy/70 transition-colors hover:border-accent-hover hover:text-accent-hover">
      {label}
    </span>
  );
}
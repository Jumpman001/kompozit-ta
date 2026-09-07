export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="ff-mono text-sm text-[var(--cyan-ink)]">{index}</span>
      <span className="ff-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
        {title}
      </span>
    </div>
  );
}

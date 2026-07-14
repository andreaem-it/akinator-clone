export function Eyebrow({ children }: { children: string }) {
  return (
    <span className="font-mono text-sm text-(--color-lime)">
      <span className="text-(--color-ink-dim)">// </span>
      {children}
    </span>
  );
}

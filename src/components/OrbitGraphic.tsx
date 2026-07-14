const nodePositions = [
  { left: "94%", top: "50%" },
  { left: "72%", top: "88.1%" },
  { left: "28%", top: "88.1%" },
  { left: "6%", top: "50%" },
  { left: "28%", top: "11.9%" },
  { left: "72%", top: "11.9%" },
];

export function OrbitGraphic() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[360px]" aria-hidden="true">
      <div className="orbit-spin absolute inset-0 rounded-full border border-(--color-void-line)" />
      <div className="orbit-spin-rev absolute inset-6 rounded-full border border-dashed border-(--color-void-line)" />
      <div className="absolute inset-[38%] rounded-full bg-gradient-to-br from-(--color-lime) via-(--color-cyan) to-(--color-violet)" />
      <div className="orbit-spin absolute inset-0">
        {nodePositions.map((pos, i) => (
          <span
            key={i}
            className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-ink)"
            style={pos}
          />
        ))}
      </div>
      <style>{`
        .orbit-spin { animation: spin 24s linear infinite; }
        .orbit-spin-rev { animation: spin 18s linear infinite reverse; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .orbit-spin, .orbit-spin-rev { animation: none; }
        }
      `}</style>
    </div>
  );
}

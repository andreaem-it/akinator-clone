const words = ["MOBILE", "AI", "REACT", "PRODOTTO", "AUTOMAZIONE", "CLOUD", "TYPESCRIPT", "PERFORMANCE"];

export function Marquee() {
  const track = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-(--color-void-line) py-4 sm:py-6">
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
        {[...track, ...track].map((w, i) => (
          <span
            key={i}
            className="font-display text-2xl font-normal tracking-tight text-(--color-ink-dim) sm:text-4xl"
          >
            {w} <span className="text-(--color-lime)">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        .marquee-track {
          animation: marquee 28s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}

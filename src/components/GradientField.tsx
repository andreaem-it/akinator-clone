export function GradientField() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="blob absolute -left-40 -top-40 size-[60vmax] rounded-full bg-(--color-violet)/25 blur-[120px]" />
      <div className="blob-2 absolute -right-40 top-1/3 size-[50vmax] rounded-full bg-(--color-lime)/20 blur-[120px]" />
      <div className="blob-3 absolute bottom-0 left-1/4 size-[45vmax] rounded-full bg-(--color-cyan)/15 blur-[120px]" />
      <style>{`
        .blob { animation: float-a 22s ease-in-out infinite; }
        .blob-2 { animation: float-b 26s ease-in-out infinite; }
        .blob-3 { animation: float-c 30s ease-in-out infinite; }
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(6vw, 8vh) scale(1.1); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-8vw, 6vh) scale(0.95); }
        }
        @keyframes float-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4vw, -6vh) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .blob, .blob-2, .blob-3 { animation: none; }
        }
      `}</style>
    </div>
  );
}

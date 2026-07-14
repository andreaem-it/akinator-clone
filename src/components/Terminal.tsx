import { useTypewriter } from "../hooks/useTypewriter";

const script = [
  { cmd: "whoami", out: "andrea emili" },
  { cmd: "role --current", out: "software engineer" },
  { cmd: "focus --list", out: "mobile · ai · product" },
  { cmd: "status", out: "open a nuove idee" },
];

export function Terminal() {
  const lines = script.flatMap((s) => [`$ ${s.cmd}`, s.out]);
  const { output, done } = useTypewriter(lines, 26, 900);

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-(--color-void-line) bg-(--color-void-soft) shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-(--color-void-line) px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/70" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/70" />
        <span className="size-2.5 rounded-full bg-[#28c840]/70" />
        <span className="ml-2 font-mono text-xs text-(--color-ink-dim)">zsh — ~/andrea</span>
      </div>
      <div className="min-h-[220px] p-5 font-mono text-sm leading-relaxed sm:text-[15px]">
        {script.map((_, i) => {
          const cmdLine = output[i * 2];
          const outLine = output[i * 2 + 1];
          if (cmdLine === undefined) return null;
          return (
            <div key={i} className="mb-1">
              <div>
                <span className="text-(--color-lime)">{cmdLine}</span>
              </div>
              {outLine !== undefined && (
                <div className="mb-2 text-(--color-ink-dim)">
                  {outLine}
                  {done && i === script.length - 1 && (
                    <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-(--color-ink-dim) align-middle" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

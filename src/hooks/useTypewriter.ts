import { useEffect, useRef, useState } from "react";

export function useTypewriter(lines: string[], speed = 28, startDelay = 500) {
  const [output, setOutput] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOutput(lines);
      setDone(true);
      return;
    }

    let cancelled = false;
    async function run() {
      await new Promise((r) => setTimeout(r, startDelay));
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        const full = lines[i];
        for (let c = 1; c <= full.length; c++) {
          if (cancelled) return;
          setOutput((prev) => {
            const next = [...prev];
            next[i] = full.slice(0, c);
            return next;
          });
          await new Promise((r) => setTimeout(r, speed));
        }
        await new Promise((r) => setTimeout(r, 220));
      }
      if (!cancelled) setDone(true);
    }
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { output, done };
}

import { useEffect, useRef } from "react";

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;

    function onMove(e: PointerEvent) {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(203,255,77,0.06), transparent 65%)`;
      }
    }
    addEventListener("pointermove", onMove);
    return () => removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-30" aria-hidden="true" />;
}

import { lenisRef } from "../hooks/useLenis";

// easeOutBack: overshoots slightly past the target then settles — a light bounce.
function easeOutBack(t: number) {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenisRef.current) {
    lenisRef.current.scrollTo(target, { duration: 1.3, easing: easeOutBack });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

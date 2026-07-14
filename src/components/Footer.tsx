import { profile } from "../data/profile";
import { scrollToId } from "../lib/scroll";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-xs text-(--color-ink-dim) sm:flex-row sm:px-10">
      <span className="flex items-center gap-3">
        © {new Date().getFullYear()} {profile.firstName}
        <span className="rounded-full border border-(--color-void-line) px-2 py-0.5 font-mono text-[11px] text-(--color-ink-dim)">
          build: stable
        </span>
      </span>
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("top");
        }}
        className="transition-colors hover:text-(--color-ink)"
      >
        Torna su ↑
      </a>
    </footer>
  );
}

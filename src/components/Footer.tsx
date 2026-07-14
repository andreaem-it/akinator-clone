import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-xs text-(--color-ink-dim) sm:flex-row sm:px-10">
      <span>
        © {new Date().getFullYear()} {profile.firstName}
      </span>
      <a href="#top" className="transition-colors hover:text-(--color-ink)">
        Torna su ↑
      </a>
    </footer>
  );
}

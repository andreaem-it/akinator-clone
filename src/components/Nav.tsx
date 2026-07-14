import { useEffect, useState } from "react";
import { profile } from "../data/profile";

const links = [
  { href: "#about", label: "Profilo" },
  { href: "#focus", label: "Focus" },
  { href: "#contact", label: "Contatti" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-(--color-void)/80 backdrop-blur-md border-b border-(--color-void-line)" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-sm font-medium tracking-widest uppercase"
        >
          <span className="font-mono text-(--color-lime)">{"</>"}</span>
          {profile.firstName}
        </a>

        <ul className="hidden gap-8 text-sm text-(--color-ink-dim) sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-(--color-ink)">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-full border border-(--color-void-line) px-4 py-2 text-sm transition-colors hover:border-(--color-lime) hover:text-(--color-lime) sm:inline-block"
        >
          Scrivimi
        </a>

        <button
          aria-label="Apri menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex size-9 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span
            className={`h-px w-5 bg-(--color-ink) transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-(--color-ink) transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-(--color-void) transition-opacity duration-300 sm:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-display text-3xl"
          >
            {l.label}
          </a>
        ))}
        <a
          href={`mailto:${profile.email}`}
          onClick={() => setOpen(false)}
          className="mt-4 rounded-full border border-(--color-lime) px-6 py-3 text-sm text-(--color-lime)"
        >
          Scrivimi
        </a>
      </div>
    </header>
  );
}

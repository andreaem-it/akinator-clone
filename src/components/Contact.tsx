import { useState } from "react";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { GradientField } from "./GradientField";
import { profile } from "../data/profile";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard non disponibile: il link mailto resta comunque utilizzabile */
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-(--color-void-line)">
      <GradientField />
      <div className="mx-auto max-w-6xl px-6 py-28 text-center sm:px-10 sm:py-40">
        <Reveal>
          <span className="text-sm text-(--color-lime)">Contatti</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 text-balance font-display text-[11vw] font-medium leading-[0.95] sm:text-6xl lg:text-7xl">
            Un progetto in mente?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-(--color-ink-dim)">
            Scrivimi via email, sarò felice di parlarne.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Magnetic as="a" {...{ href: `mailto:${profile.email}` }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-(--color-lime) px-8 py-4 text-base font-medium text-(--color-void)">
                {profile.email}
              </span>
            </Magnetic>
            <button
              onClick={copyEmail}
              data-cursor="hover"
              className="text-sm text-(--color-ink-dim) underline decoration-(--color-void-line) underline-offset-4 transition-colors hover:text-(--color-ink)"
            >
              {copied ? "Copiato ✓" : "Copia indirizzo"}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 flex items-center justify-center gap-6 text-sm text-(--color-ink-dim)">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-(--color-lime)"
              >
                GitHub
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-(--color-lime)"
              >
                LinkedIn
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

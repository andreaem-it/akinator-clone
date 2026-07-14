import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { TiltCard } from "./TiltCard";
import { skillGroups, currentRole } from "../data/profile";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10 sm:py-36">
      <Reveal>
        <Eyebrow>profilo</Eyebrow>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-medium leading-tight sm:text-5xl">
          Software engineer con un approccio full stack, oggi concentrato su{" "}
          <span className="gradient-text">app mobile</span> e{" "}
          <span className="gradient-text">soluzioni AI</span>.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-xl text-(--color-ink-dim)">
          Progetto e sviluppo prodotti digitali end-to-end: dall'architettura del software
          all'esperienza utente, passando per performance e automazione. Uso l'AI come strumento
          di lavoro quotidiano, non come slogan.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-10 max-w-xl">
        <TiltCard className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-(--color-void-line) bg-(--color-void-soft) px-6 py-5">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-(--color-ink-dim)">
              Attualmente
            </span>
            <p className="mt-1 font-display text-lg font-medium">
              {currentRole.title} <span className="text-(--color-ink-dim)">@</span>{" "}
              <span className="gradient-text">{currentRole.company}</span>
            </p>
            <p className="mt-0.5 text-sm text-(--color-ink-dim)">{currentRole.location}</p>
          </div>
          <div className="flex flex-col items-start gap-1 font-mono text-sm">
            <a
              href={currentRole.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="text-(--color-lime) transition-colors hover:text-(--color-ink)"
            >
              bncom.it ↗
            </a>
            <a
              href={`mailto:${currentRole.companyEmail}`}
              className="text-(--color-ink-dim) transition-colors hover:text-(--color-ink)"
            >
              {currentRole.companyEmail}
            </a>
          </div>
        </TiltCard>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={0.05 * i}>
            <h3 className="font-mono text-sm uppercase tracking-widest text-(--color-ink-dim)">
              <span className="text-(--color-violet)">#</span> {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-(--color-void-line) px-4 py-2 font-mono text-sm transition-colors hover:border-(--color-lime) hover:text-(--color-lime)"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

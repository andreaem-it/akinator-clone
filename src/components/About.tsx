import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { skillGroups } from "../data/profile";

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

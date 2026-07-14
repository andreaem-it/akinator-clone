import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { focusAreas } from "../data/profile";

export function Focus() {
  return (
    <section id="focus" className="relative border-t border-(--color-void-line) bg-(--color-void-soft)">
      <div className="mx-auto max-w-6xl px-6 py-28 sm:px-10 sm:py-36">
        <Reveal>
          <Eyebrow>focus</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-medium leading-tight sm:text-5xl">
            Dove porto valore, oggi.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-(--color-void-line) sm:grid-cols-3">
          {focusAreas.map((area, i) => (
            <Reveal key={area.index} delay={0.08 * i} y={20}>
              <div className="group relative h-full bg-(--color-void-soft) p-8 transition-colors hover:bg-(--color-void) sm:p-10">
                <span className="font-mono text-sm text-(--color-ink-dim)">
                  [<span className="text-(--color-lime)">{area.index}</span>]
                </span>
                <h3 className="mt-8 font-display text-2xl font-medium">{area.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-(--color-ink-dim)">
                  {area.description}
                </p>
                <div className="mt-8 h-px w-8 bg-(--color-lime) transition-all duration-500 group-hover:w-16" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

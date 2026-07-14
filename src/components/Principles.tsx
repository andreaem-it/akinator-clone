import { Reveal } from "./Reveal";
import { principles } from "../data/profile";

export function Principles() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 sm:px-10 sm:py-36">
      <div className="flex flex-col gap-10 sm:gap-0">
        {principles.map((p, i) => (
          <Reveal key={p.index} delay={0.05 * i}>
            <div className="flex flex-col gap-4 border-t border-(--color-void-line) py-8 sm:flex-row sm:items-center sm:gap-10 sm:py-10">
              <span className="font-display text-lg text-(--color-lime)">{p.index}</span>
              <h3 className="font-display text-2xl font-medium sm:w-72 sm:shrink-0 sm:text-3xl">
                {p.title}
              </h3>
              <p className="max-w-md text-(--color-ink-dim)">{p.description}</p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-(--color-void-line)" />
      </div>
    </section>
  );
}

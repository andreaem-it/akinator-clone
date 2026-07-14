import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { GradientField } from "./GradientField";
import { Terminal } from "./Terminal";
import { Magnetic } from "./Magnetic";
import { scrollToId } from "../lib/scroll";

const line = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};

function KineticLine({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      variants={line}
      initial="hidden"
      animate="show"
      className={`flex flex-wrap overflow-hidden ${className ?? ""}`}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} className="mr-[0.28em] overflow-hidden pb-2">
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-24">
      <GradientField />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 flex items-center gap-2 text-sm text-(--color-ink-dim)"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-(--color-lime)" />
            {profile.role} · {profile.location}
          </motion.p>

          <h1 className="font-display text-[13vw] font-medium leading-[0.92] sm:text-[8vw] lg:text-[5vw]">
            <KineticLine text={`Ciao, sono ${profile.firstName}.`} />
            <KineticLine text="Costruisco" className="gradient-text" />
            <KineticLine text="app mobile & soluzioni AI." />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-8 max-w-md text-balance text-lg text-(--color-ink-dim)"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic
              as="a"
              {...{ href: "#contact", onClick: (e: React.MouseEvent) => { e.preventDefault(); scrollToId("contact"); } }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-(--color-lime) px-6 py-3 text-sm font-medium text-(--color-void) transition-transform active:scale-95">
                Contattami
              </span>
            </Magnetic>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); scrollToId("about"); }}
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-sm text-(--color-ink-dim) transition-colors hover:text-(--color-ink)"
            >
              Scopri di più ↓
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}

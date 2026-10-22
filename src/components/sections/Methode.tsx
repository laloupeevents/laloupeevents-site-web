"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { Eyebrow } from "@/components/ui/elements";
import { Reveal, SplitWords } from "@/components/ui/motion";
import { processus } from "@/lib/content";

export function Methode() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [reached, setReached] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(v <= 0.01 ? -1 : Math.min(processus.length - 1, Math.floor(v * processus.length)));
  });

  return (
    <section id="methode" className="relative overflow-hidden bg-creme py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow index="04" className="text-vert-900">
                Notre processus opérationnel
              </Eyebrow>
            </Reveal>
            <h2 className="mt-8 text-[clamp(2.3rem,5vw,4.6rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-vert-900">
              <SplitWords text="Une méthode éprouvée," className="block" />
              <SplitWords text="en quatre temps." delay={0.15} wordClassName="font-serif font-medium italic tracking-normal" />
            </h2>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4">
            <p className="text-base leading-relaxed text-encre/70 md:text-lg">
              Chaque mission suit le même fil conducteur, de l&apos;analyse des besoins jusqu&apos;au rapport
              d&apos;impact.
            </p>
          </Reveal>
        </div>

        <ol ref={ref} className="relative mt-20 grid gap-14 pl-10 md:mt-28 md:grid-cols-4 md:gap-8 md:pl-0">
          {/* Fil conducteur : vertical sur mobile, horizontal sur grand écran */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-vert-900/15 md:top-[7px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-vert-900 md:hidden"
          />
          <motion.span
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute top-[7px] left-0 hidden h-px w-full origin-left bg-vert-900 md:block"
          />

          {processus.map((step, i) => (
            <li key={step.title} className="relative md:pt-14">
              <span
                aria-hidden
                className={`absolute top-1 -left-10 size-[15px] rounded-full border-2 transition-colors duration-500 md:top-0 md:left-0 ${
                  reached >= i ? "border-vert-900 bg-or" : "border-vert-900/30 bg-creme"
                }`}
              />
              <Reveal delay={i * 0.1}>
                <span className="text-outline block text-[clamp(4rem,7vw,6.5rem)] leading-none font-black text-vert-900">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-vert-900">{step.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-encre/70">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

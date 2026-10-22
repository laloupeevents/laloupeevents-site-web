"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Eyebrow } from "@/components/ui/elements";
import { EASE, Reveal, SplitWords } from "@/components/ui/motion";
import { sommets } from "@/lib/content";

export function Sommets() {
  const [active, setActive] = useState(0);

  return (
    <section id="sommets" className="relative bg-creme-50 py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <Eyebrow index="03" className="text-vert-900">
            Sommets &amp; Conférences
          </Eyebrow>
        </Reveal>
        <h2 className="mt-8 max-w-4xl text-[clamp(2.3rem,5vw,4.6rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-vert-900">
          <SplitWords text="Des rencontres de haut niveau," className="block" />
          <SplitWords
            text="orchestrées au millimètre."
            delay={0.15}
            wordClassName="font-serif font-medium italic tracking-normal"
          />
        </h2>

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-2 lg:gap-20">
          <div className="hidden lg:block">
            <div className="sticky top-28 h-[calc(100svh-9rem)] overflow-hidden rounded-sm bg-vert-900">
              {sommets.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1 : 1.1,
                    clipPath: active === i ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                  }}
                  transition={{ duration: 1.1, ease: EASE }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="50vw"
                    placeholder="blur"
                    className="object-cover"
                    style={{ objectPosition: item.position }}
                  />
                </motion.div>
              ))}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-vert-950/80 to-transparent p-8 text-creme">
                <span className="text-sm font-semibold tracking-[0.25em] uppercase">{sommets[active].title}</span>
                <span className="text-sm tabular-nums">
                  <span className="text-2xl font-bold">0{active + 1}</span>
                  <span className="text-creme/60"> / 0{sommets.length}</span>
                </span>
              </div>
            </div>
          </div>

          <ol>
            {sommets.map((item, i) => (
              <SommetItem key={item.title} index={i} item={item} onActive={setActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SommetItem({
  index,
  item,
  onActive,
}: {
  index: number;
  item: (typeof sommets)[number];
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="flex flex-col justify-center border-t border-vert-900/15 py-12 lg:min-h-[72svh] lg:py-0">
      <div className="mb-8 aspect-[4/3] overflow-hidden rounded-sm lg:hidden">
        <Image
          src={item.image}
          alt={item.alt}
          sizes="100vw"
          placeholder="blur"
          className="h-full w-full object-cover"
          style={{ objectPosition: item.position }}
        />
      </div>
      <motion.div
        animate={{ opacity: inView ? 1 : 0.35 }}
        transition={{ duration: 0.6 }}
        className="max-lg:opacity-100!"
      >
        <span className="text-sm font-semibold tracking-[0.25em] text-or">0{index + 1}</span>
        <h3 className="mt-5 text-[clamp(2rem,3.6vw,3.4rem)] leading-none font-bold tracking-tight text-vert-900">
          {item.title}
        </h3>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-encre/70">{item.text}</p>
      </motion.div>
    </li>
  );
}

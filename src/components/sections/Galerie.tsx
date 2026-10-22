"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Eyebrow } from "@/components/ui/elements";
import { SplitWords } from "@/components/ui/motion";
import { galerie } from "@/lib/content";

/** Galerie à défilement horizontal piloté par le scroll vertical (grand écran) ; carrousel natif sur mobile. */
export function Galerie() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      const track = trackRef.current;
      setDistance(query.matches && track ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    query.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section
      ref={sectionRef}
      aria-label="Galerie"
      className="relative bg-vert-900 text-creme"
      style={distance ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className="flex flex-col justify-center overflow-hidden py-28 lg:sticky lg:top-0 lg:h-[100svh] lg:py-0">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-6 px-5 md:flex-row md:items-end md:px-10">
          <div>
            <Eyebrow index="07">En images</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-[clamp(2rem,4.4vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
              <SplitWords text="Quelques domaines d'expertise" className="block" />
              <SplitWords text="en images." delay={0.1} wordClassName="font-serif font-medium italic tracking-normal text-creme-300" />
            </h2>
          </div>
          <div className="hidden h-px w-48 overflow-hidden bg-creme/20 lg:block">
            <motion.span style={{ scaleX: bar }} className="block h-full origin-left bg-or" />
          </div>
        </div>

        <div className="mt-12 overflow-x-auto [scrollbar-width:none] lg:mt-16 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max snap-x snap-mandatory items-end gap-5 px-5 md:gap-8 md:px-10 lg:snap-none"
          >
            {galerie.map((item, i) => (
              <figure key={item.caption} className="group shrink-0 snap-start">
                {/* Format unique pour toutes les cartes : un carrousel régulier */}
                <div className="relative aspect-[4/5] h-[46vh] max-h-[520px] min-h-[340px] overflow-hidden rounded-sm lg:max-h-none">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 80vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-105"
                    style={{ objectPosition: item.position }}
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline gap-3 text-sm">
                  <span className="text-xs font-semibold text-or">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium text-creme/85">{item.caption}</span>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

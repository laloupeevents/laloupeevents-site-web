"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { DrawLine, EASE } from "@/components/ui/motion";
import { modules } from "@/lib/content";

/** Liste des modules : au survol, un aperçu photo suit le pointeur (souris uniquement). */
export function ModulesList() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  return (
    <div
      ref={ref}
      className="relative mt-12"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        // L'aperçu reste dans la colonne libre entre titres et descriptions, avec une légère dérive.
        x.set((e.clientX - r.left - r.width / 2) * 0.12);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ol>
        {modules.map((module, i) => (
          <li key={module.title} onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}>
            <DrawLine className="bg-creme/15" delay={i * 0.05} />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
              className={`grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 transition-opacity duration-500 md:grid-cols-[4rem_1fr_minmax(0,22rem)] md:gap-8 md:py-9 ${
                hovered !== null && hovered !== i ? "md:opacity-35" : ""
              }`}
            >
              <span className="text-sm font-semibold text-or">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h4
                  className={`text-[clamp(1.5rem,3.2vw,2.9rem)] leading-tight font-bold tracking-tight transition-transform duration-700 ease-luxe ${
                    hovered === i ? "md:translate-x-4" : ""
                  }`}
                >
                  {module.title}
                </h4>
                <p className="mt-2 text-[0.95rem] text-creme/65 md:hidden">{module.text}</p>
              </div>
              <p className="hidden text-base leading-relaxed text-creme/65 md:block">{module.text}</p>
              <div className="relative col-start-3 row-start-1 size-16 overflow-hidden rounded-sm md:hidden">
                <Image src={module.image} alt="" fill sizes="64px" className="object-cover" />
              </div>
            </motion.div>
          </li>
        ))}
      </ol>
      <DrawLine className="bg-creme/15" />

      {/* Aperçu flottant */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute top-0 left-[57%] z-10 hidden md:block"
      >
        <motion.div
          className="relative h-[300px] w-[240px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm shadow-2xl"
          initial={false}
          animate={{
            scale: hovered === null ? 0 : 1,
            opacity: hovered === null ? 0 : 1,
            rotate: hovered === null ? -8 : -3,
          }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {modules.map((module, i) => (
            <motion.div
              key={module.title}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: hovered === i ? 1 : 0, scale: hovered === i ? 1 : 1.15 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Image src={module.image} alt="" fill sizes="240px" className="object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

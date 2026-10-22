"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useIntro } from "@/components/providers/Providers";
import { useMediaQuery } from "@/lib/hooks";
import { Button } from "@/components/ui/elements";
import { EASE, SplitWords } from "@/components/ui/motion";
import { images } from "@/lib/images";

const ZOOM = 1.9;
/** Débord vertical du calque image (pour la parallaxe), en fraction de la hauteur. */
const BLEED = 0.12;

export function Hero() {
  const { ready } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const finePointer = useMediaQuery("(pointer: fine)", true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Position de la loupe dans le repère du hero.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 160, damping: 22, mass: 0.6 });
  const y = useSpring(my, { stiffness: 160, damping: 22, mass: 0.6 });
  const radius = finePointer ? 115 : 62;
  const radiusMv = useMotionValue(radius);
  const heightMv = useMotionValue(0);

  // Contenu agrandi : le point sous le centre de la loupe reste aligné avec l'image de fond.
  const innerLeft = useTransform([x, radiusMv], ([px, r]: number[]) => r - px * ZOOM);
  const innerTop = useTransform(
    [y, parallax, heightMv, radiusMv],
    ([py, offset, h, r]: number[]) => r - (py + BLEED * h - offset) * ZOOM,
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ w: width, h: height });
      heightMv.set(height);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [heightMv]);

  useEffect(() => radiusMv.set(radius), [radius, radiusMv]);

  // Position de repos : sur le lustre de droite (desktop) ou le lustre central (mobile).
  const home = () => ({ x: box.w * (box.w < 768 ? 0.62 : 0.84), y: box.h * (box.w < 768 ? 0.17 : 0.29) });

  useEffect(() => {
    if (!box.w) return;
    const start = home();
    mx.jump(start.x);
    my.jump(start.y);
    x.jump(start.x);
    y.jump(start.y);
    if (finePointer) return;
    // Écrans tactiles : la loupe se promène lentement sur l'image.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ax = animate(mx, [start.x, box.w * 0.32, box.w * 0.5, start.x], {
      duration: 16,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const ay = animate(my, [start.y, box.h * 0.13, box.h * 0.16, start.y], {
      duration: 16,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => {
      ax.stop();
      ay.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box.w, box.h, finePointer]);

  return (
    <section
      id="top"
      ref={ref}
      data-cursor="hide"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-vert-950 text-creme"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        const start = home();
        mx.set(start.x);
        my.set(start.y);
      }}
    >
      {/* Image de fond, assourdie et teintée de vert */}
      <motion.div
        aria-hidden
        style={{ y: parallax, top: `-${BLEED * 100}%`, bottom: `-${BLEED * 100}%` }}
        className="absolute inset-x-0 -z-20"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={ready ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 2.4, ease: EASE }}
      >
        <Image
          src={images.salleApparat}
          alt=""
          fill
          preload
          sizes="100vw"
          placeholder="blur"
          className="object-cover brightness-[0.78] saturate-[0.5]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-vert-900/50 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,transparent_0%,rgba(2,29,20,0.55)_75%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-vert-950 via-vert-950/60 to-transparent" />

      {/* La loupe : révèle la photo en couleurs, agrandie */}
      {box.w > 0 && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0"
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2" style={{ width: radius * 2, height: radius * 2 }}>
            {/* Manche, dans l'axe du logo */}
            <div
              className="absolute top-1/2 left-1/2 w-0"
              style={{ transform: `rotate(-32deg) translateY(${radius + 7}px)` }}
            >
              <div
                className="-translate-x-1/2 border-x border-creme/80"
                style={{ width: radius * 0.16, height: radius * 0.34 }}
              />
              <div
                className="-translate-x-1/2 rounded-t-[3px] rounded-b-full border-[1.5px] border-creme/85 bg-vert-950/35 backdrop-blur-sm"
                style={{ width: radius * 0.3, height: radius * 0.95 }}
              />
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <motion.div
                className="absolute"
                style={{
                  left: innerLeft,
                  top: innerTop,
                  width: box.w * ZOOM,
                  height: box.h * (1 + 2 * BLEED) * ZOOM,
                }}
              >
                <Image src={images.salleApparat} alt="" fill sizes="200vw" className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.18),transparent_55%)]" />
            </div>
            <div className="absolute inset-0 rounded-full border-[3px] border-creme/90" />
            <div className="absolute -inset-[7px] rounded-full border border-creme/60" />
          </div>
        </motion.div>
      )}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="pointer-events-none relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pt-36 pb-10 md:px-10 md:pb-14"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mb-8 flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.32em] text-creme/80 uppercase"
        >
          <span className="h-px w-10 bg-or" />
          Protocole étatique &amp; événementiel
        </motion.p>

        <h1 className="max-w-[15ch] text-[clamp(2.9rem,8.2vw,8.4rem)] leading-[0.92] font-extrabold tracking-[-0.035em]">
          <SplitWords text="Celui qui dirige" play={ready} delay={0.3} className="block" />
          <span className="block">
            <SplitWords text="comme celui qui" play={ready} delay={0.45} />{" "}
            <SplitWords
              text="sert."
              play={ready}
              delay={0.65}
              wordClassName="font-serif font-medium italic tracking-normal text-creme-300"
            />
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
            className="max-w-md text-base leading-relaxed font-light text-creme/80 md:text-lg"
          >
            Organisation événementielle et maîtrise du protocole étatique pour les institutions, les
            gouvernements et les leaders d&apos;organisations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: 1.05 }}
            className="pointer-events-auto flex flex-wrap gap-3"
          >
            <Button href="#contact">Organiser un événement</Button>
            <Button href="#academie" variant="outline-creme">
              L&apos;Académie du Protocole
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-14 flex items-center justify-between border-t border-creme/15 pt-6 text-[0.68rem] font-semibold tracking-[0.28em] text-creme/60 uppercase"
        >
          <span className="flex items-center gap-3">
            <span className="relative h-8 w-px overflow-hidden bg-creme/20">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-creme"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            Défiler
          </span>
          <span className="hidden md:block">{finePointer ? "Promenez la loupe sur l'image" : ""}</span>
          <span>Dakar — Sénégal</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

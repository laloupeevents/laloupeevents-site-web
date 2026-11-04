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
  const radius = finePointer ? 115 : 50;
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
  const home = () => ({ x: box.w * (box.w < 768 ? 0.62 : 0.84), y: box.h * (box.w < 768 ? 0.12 : 0.29) });

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
    const ay = animate(my, [start.y, box.h * 0.1, box.h * 0.13, start.y], {
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
          {/* Point d'ancrage = centre du verre ; le contour officiel est posé autour. */}
          <div className="relative size-0">
            <div
              className="absolute overflow-hidden rounded-full shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
              style={{ left: -radius, top: -radius, width: radius * 2, height: radius * 2 }}
            >
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
            <LoupeContour radius={radius} />
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

// Contour officiel de la loupe (src/assets/brand/loupe-contour.svg), repère SVG 308.94 × 489.67.
// Le cercle intérieur du verre y est centré en (138.9, 140.6) avec un rayon de 115.2.
const CONTOUR = { w: 308.94, h: 489.67, cx: 138.9, cy: 140.6, r: 115.2 };
const MANCHE = "M306.43,450.16c-2.59-8.29-6.45-16.09-9.65-24.12-13.04-30.76-26.13-61.51-38.71-92.47-18.99,8.49-38.68,15.38-57.31,24.66,15.9,38.97,31.72,77.98,48.43,116.63,3.77,8.57,13.29,13.48,22.42,13.31,11.09-.25,22.04-5.49,29.06-14.1,5.14-6.64,8.57-15.6,5.76-23.91Z";
const MONTURE = "M267.91,91.06c-.47-1.33-.99-2.64-1.52-3.94-2.58-6.44-5.64-12.67-9.13-18.65-11.02-18.78-26.38-34.99-45.22-46.31C181.13,2.82,142.23-3.4,106.82,5.45c-21.53,5.31-41.68,15.92-58.12,30.81C19.51,61.9,2.22,100.16,1.56,138.95c-.49,15.26,1.84,30.44,6.55,44.88.44,1.4.91,2.78,1.42,4.16.19.51.37,1.03.57,1.53,5.85,15.6,14.49,30.21,25.32,42.87.51.59.99,1.16,1.52,1.74,15.73,17.81,35.88,31.64,58.74,38.85,25.81,8.32,53.84,8.57,79.97,1.63,9.4,19.93,17.47,40.48,27.07,60.33,12.23-4.09,23.96-9.48,35.9-14.34-8.24-21.29-17.77-42.07-26.33-63.22,25.13-16.9,45.18-41.76,55.71-70.18.34-.93.67-1.87.99-2.81,2.44-7.04,4.3-14.3,5.49-21.7,4.41-23.96,1.82-48.87-6.59-71.63ZM211.61,230.28c-14.81,12.9-33.29,21.33-52.63,24.56-31.87,5.29-65.57-4.04-91.06-23.65-12.97-9.89-23.5-22.76-30.98-37.21-.52-1.01-1.03-2.02-1.52-3.05-.24-.47-.45-.93-.67-1.4-.24-.51-.47-1.03-.69-1.53-2-4.48-3.72-9.1-5.14-13.8-1.52-5-2.68-10.11-3.49-15.26-7.7-46.21,15.97-95.86,56.94-118.7,24.93-14.42,55.46-19.2,83.47-12.1,27.21,6.69,52.26,23.18,67.67,46.8.77,1.15,1.55,2.29,2.27,3.47,11.61,18.24,18.24,39.76,17.96,61.47-.34,34.25-15.92,68.26-42.15,90.4Z";

/** Monture et manche de la loupe, mis à l'échelle pour que le verre ait le rayon voulu. */
function LoupeContour({ radius }: { radius: number }) {
  const scale = radius / CONTOUR.r;
  return (
    <svg
      viewBox={`0 0 ${CONTOUR.w} ${CONTOUR.h}`}
      className="absolute drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
      style={{
        left: -CONTOUR.cx * scale,
        top: -CONTOUR.cy * scale,
        width: CONTOUR.w * scale,
        height: CONTOUR.h * scale,
      }}
    >
      <g fill="rgba(2,29,20,0.35)" stroke="#f8ecc4" strokeWidth={3} strokeMiterlimit={10}>
        <path d={MANCHE} />
        <path d={MONTURE} fillRule="evenodd" />
      </g>
    </svg>
  );
}

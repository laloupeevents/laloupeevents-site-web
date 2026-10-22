"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useIntro } from "@/components/providers/Providers";
import { useIntroSeen } from "@/lib/hooks";
import { EASE } from "@/components/ui/motion";
import logoCreme from "@/assets/brand/logo-creme-signature.png";

const DURATION_MS = 2100;

export function Preloader() {
  const { setReady } = useIntro();
  const seen = useIntroSeen();
  const [playing, setPlaying] = useState(true);
  const visible = playing && !seen;
  const lenis = useLenis();

  useEffect(() => {
    if (seen) return;
    window.scrollTo(0, 0);
    const timer = window.setTimeout(() => {
      setPlaying(false);
      setReady(true);
      try {
        sessionStorage.setItem("loupe-intro", "1");
      } catch {}
    }, DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [seen, setReady]);

  useEffect(() => {
    if (!lenis) return;
    if (visible) lenis.stop();
    else lenis.start();
  }, [lenis, visible]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.dataset.intro = "done";
      }}
    >
      {visible && (
        <motion.div
          key="preloader"
          data-preloader
          aria-hidden
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-vert-900 text-creme"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: EASE }}
            className="w-[min(70vw,380px)]"
          >
            <Image src={logoCreme} alt="" preload className="h-auto w-full" sizes="380px" />
          </motion.div>

          <div className="mt-12 h-px w-[min(60vw,260px)] overflow-hidden bg-creme/15">
            <motion.span
              className="block h-full origin-left bg-or"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DURATION_MS / 1000 - 0.2, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-5 text-[0.65rem] font-semibold tracking-[0.4em] uppercase"
          >
            Dakar — Sénégal
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

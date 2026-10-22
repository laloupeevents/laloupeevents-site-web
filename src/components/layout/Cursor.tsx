"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/hooks";

type Variant = "default" | "hover" | "label" | "hidden";

const INTERACTIVE = "[data-cursor], a, button, input, textarea, select, label";

/** Curseur d'accompagnement (souris uniquement, désactivé si mouvement réduit). */
export function Cursor() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [variant, setVariant] = useState<Variant>("hidden");
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as Element | null)?.closest(INTERACTIVE);
      const value = target?.getAttribute("data-cursor");
      if (!target) {
        setVariant("default");
      } else if (value === "hide") {
        setVariant("hidden");
      } else if (value) {
        setLabel(value);
        setVariant("label");
      } else {
        setVariant("hover");
      }
    };
    const onLeave = () => setVariant("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = { default: 14, hover: 56, label: 96, hidden: 0 }[variant];

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[80]"
    >
      <motion.div
        animate={{ width: size, height: size, opacity: variant === "hidden" ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
          variant === "label"
            ? "bg-creme text-vert-900"
            : "bg-white mix-blend-difference"
        }`}
      >
        {variant === "label" && (
          <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase">{label}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

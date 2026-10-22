"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { contact, nav } from "@/lib/content";
import { EASE } from "@/components/ui/motion";
import logoCreme from "@/assets/brand/logo-creme.png";
import logoVert from "@/assets/brand/logo-vert.png";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 60);
    setHidden(y > previous && y > 500);
  });

  // Bloque le défilement pendant que le menu est ouvert (sans interférer avec l'intro).
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) lenis?.stop();
    else if (wasOpen.current) lenis?.start();
    wasOpen.current = open;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    if (lenis) {
      lenis.start();
      lenis.scrollTo(href, { duration: 1.4 });
    } else {
      document.querySelector(href)?.scrollIntoView();
    }
  };

  const light = scrolled && !open;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
            light
              ? "border-b border-vert-900/10 bg-creme-50/80 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:h-24 md:px-10">
            <a href="#top" onClick={(e) => goTo(e, "#top")} aria-label="La Loupe — retour en haut" className="relative block h-10 w-[77px] md:h-12 md:w-[92px]">
              <Image
                src={logoCreme}
                alt="La Loupe"
                fill
                sizes="92px"
                preload
                className={`object-contain transition-opacity duration-500 ${light ? "opacity-0" : "opacity-100"}`}
              />
              <Image
                src={logoVert}
                alt=""
                fill
                sizes="92px"
                className={`object-contain transition-opacity duration-500 ${light ? "opacity-100" : "opacity-0"}`}
              />
            </a>

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className={`flex items-center gap-9 text-[0.8rem] font-medium tracking-wide transition-colors duration-500 ${light ? "text-vert-900" : "text-creme"}`}>
                {nav.slice(0, -1).map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="group relative py-2">
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-luxe group-hover:origin-left group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className={`hidden rounded-full px-6 py-3 text-[0.8rem] font-semibold tracking-wide transition-colors duration-500 md:inline-flex ${
                  light ? "bg-vert-900 text-creme hover:bg-vert-700" : "bg-creme text-vert-900 hover:bg-creme-300"
                }`}
              >
                Nous contacter
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                className={`relative flex size-12 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden ${
                  light ? "border-vert-900/20 text-vert-900" : "border-creme/30 text-creme"
                }`}
              >
                <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ease-luxe ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
                <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ease-luxe ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-vert-900 px-6 pt-32 pb-10 text-creme lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 48px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 48px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 48px)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <nav aria-label="Navigation mobile">
              <ul className="space-y-2">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={(e) => goTo(e, item.href)}
                      className="flex items-baseline gap-4 py-1 text-[2.6rem] leading-tight font-bold tracking-tight"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}
                    >
                      <span className="text-xs font-semibold text-or">0{i + 1}</span>
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-1 text-sm text-creme/70"
            >
              <a href={`mailto:${contact.email}`} className="block">{contact.email}</a>
              <a href={contact.phoneHref} className="block">{contact.phoneDisplay}</a>
              <p>{contact.city}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

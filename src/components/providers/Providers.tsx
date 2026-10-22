"use client";

import { createContext, useContext, useState } from "react";
import { MotionConfig } from "motion/react";
import { ReactLenis } from "lenis/react";
import { useIntroSeen, useMediaQuery } from "@/lib/hooks";

type IntroState = { ready: boolean; setReady: (ready: boolean) => void };

const IntroContext = createContext<IntroState>({ ready: true, setReady: () => {} });

/** `ready` passe à true quand l'intro est terminée : les animations du hero démarrent à ce moment. */
export const useIntro = () => useContext(IntroContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const seen = useIntroSeen();
  const [played, setPlayed] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={{ ready: seen || played, setReady: setPlayed }}>
        {!reducedMotion && <ReactLenis root options={{ lerp: 0.09, anchors: true }} />}
        {children}
      </IntroContext.Provider>
    </MotionConfig>
  );
}

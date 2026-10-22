"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Valeur d'une media query, synchronisée avec le navigateur. */
export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

const noSubscription = () => () => {};

/** Vrai si l'intro a déjà été vue dans cette session (posé par le script inline du layout). */
export function useIntroSeen() {
  return useSyncExternalStore(
    noSubscription,
    () => document.documentElement.dataset.intro === "done",
    () => false,
  );
}

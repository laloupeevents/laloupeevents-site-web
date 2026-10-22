import { marquee } from "@/lib/content";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="relative overflow-hidden border-y border-vert-900/10 bg-creme py-7 text-vert-900 md:py-9" aria-label="Nos domaines d'intervention">
      <ul className="flex w-max animate-marquee items-center [--marquee-duration:55s] hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= marquee.length}
            className="flex items-center text-[clamp(1.6rem,3.6vw,3.2rem)] font-extralight tracking-tight whitespace-nowrap"
          >
            <span className={i % 2 === 0 ? "" : "font-serif font-medium italic"}>{item}</span>
            <svg viewBox="0 0 24 24" className="mx-8 size-5 shrink-0 text-or md:mx-12 md:size-6" aria-hidden>
              <path d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0Z" fill="currentColor" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}

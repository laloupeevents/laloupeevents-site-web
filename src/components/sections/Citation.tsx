import Image from "next/image";
import { Reveal, ScrollWords } from "@/components/ui/motion";
import { citation } from "@/lib/content";
import { images } from "@/lib/images";

export function Citation() {
  return (
    <section className="relative isolate overflow-hidden bg-vert-900 py-32 text-creme md:py-48" aria-label="Le mot de la fondatrice">
      <Image
        src={images.salleDeBal}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-[0.12] mix-blend-luminosity"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-vert-900 via-vert-900/70 to-vert-900" />

      <figure className="mx-auto max-w-5xl px-5 text-center md:px-10">
        <Reveal>
          <span aria-hidden className="block font-serif text-[7rem] leading-[0.6] text-or md:text-[10rem]">
            &ldquo;
          </span>
        </Reveal>
        <blockquote className="mt-6">
          <ScrollWords
            text={citation.text}
            className="font-serif text-[clamp(1.8rem,3.9vw,3.6rem)] leading-[1.18] font-medium italic"
          />
        </blockquote>
        <Reveal delay={0.1}>
          <figcaption className="mt-12 flex items-center justify-center gap-4 text-xs font-semibold tracking-[0.3em] text-creme/70 uppercase">
            <span aria-hidden className="h-px w-10 bg-or" />
            {citation.author}
            <span aria-hidden className="h-px w-10 bg-or" />
          </figcaption>
        </Reveal>
      </figure>
    </section>
  );
}

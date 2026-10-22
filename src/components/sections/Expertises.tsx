import Image from "next/image";
import { ArrowIcon, Eyebrow } from "@/components/ui/elements";
import { Reveal, SplitWords } from "@/components/ui/motion";
import { expertises } from "@/lib/content";

export function Expertises() {
  return (
    <section id="expertises" className="relative bg-vert-900 py-28 text-creme md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="02">Nos domaines d&apos;expertise</Eyebrow>
            </Reveal>
            <h2 className="mt-8 text-[clamp(2.4rem,5.4vw,5rem)] leading-[1] font-extrabold tracking-[-0.03em]">
              <SplitWords text="Trois métiers," className="block" />
              <SplitWords
                text="une seule exigence."
                delay={0.15}
                wordClassName="font-serif font-medium italic tracking-normal text-creme-300"
              />
            </h2>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-relaxed font-light text-creme/70 md:text-lg">
              De la conception d&apos;un sommet à la formation de vos équipes protocolaires, nous
              intervenons partout où l&apos;image de l&apos;État et des institutions est en jeu.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 md:mt-24 md:grid-cols-3 md:gap-6">
          {expertises.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.12} y={60}>
              <a
                href={item.href}
                data-cursor="Voir"
                className="group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-sm p-7 md:aspect-[3/4] md:p-8"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  placeholder="blur"
                  className="-z-10 object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-110"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-vert-950 via-vert-950/45 to-vert-950/10 transition-opacity duration-700 group-hover:opacity-90" />
                <div className="absolute inset-0 -z-10 bg-vert-900/0 mix-blend-multiply transition-colors duration-700 group-hover:bg-vert-900/40" />

                <div className="flex items-start justify-between">
                  <span className="text-sm font-semibold tracking-[0.2em] text-creme/80">{item.index}</span>
                  <span className="flex size-11 items-center justify-center rounded-full border border-creme/30 transition-all duration-500 ease-luxe group-hover:rotate-[-45deg] group-hover:border-creme group-hover:bg-creme group-hover:text-vert-900">
                    <ArrowIcon className="size-4" />
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{item.title}</h3>
                  <span className="mt-4 block h-px w-full origin-left scale-x-[0.18] bg-or transition-transform duration-700 ease-luxe group-hover:scale-x-100" />
                  <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-creme/80">{item.text}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

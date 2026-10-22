import { Eyebrow } from "@/components/ui/elements";
import { DrawLine, ParallaxImage, Reveal, ScrollWords } from "@/components/ui/motion";
import { images } from "@/lib/images";

const publics = ["Institutions", "Gouvernements", "Leaders d'organisations"];

export function Maison() {
  return (
    <section id="maison" className="relative bg-creme-50 py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow index="01" className="text-vert-900">
                La Maison
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 hidden lg:block">
              <p className="max-w-xs text-sm leading-relaxed text-encre/60">
                La Loupe conçoit et orchestre des événements à haute valeur stratégique, avec la rigueur
                du protocole d&apos;État.
              </p>
            </Reveal>
          </div>
          <ScrollWords
            className="text-[clamp(1.9rem,4.1vw,3.9rem)] leading-[1.12] font-light tracking-[-0.02em] text-vert-900 lg:col-span-8"
            text="Une expertise multisectorielle dédiée aux institutions, aux gouvernements et aux leaders d'organisations, pour des événements à haute valeur stratégique."
          />
        </div>

        <div className="mt-24 grid gap-6 md:mt-36 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <ParallaxImage
              src={images.dakarRenaissance}
              alt="Le Monument de la Renaissance africaine à Dakar au coucher du soleil"
              className="aspect-[3/4] rounded-sm"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
            <p className="mt-4 text-[0.68rem] font-semibold tracking-[0.25em] text-encre/50 uppercase">
              Dakar — Monument de la Renaissance africaine
            </p>
          </div>

          <div className="flex flex-col justify-between gap-12 md:col-span-7 md:pl-8">
            <div>
              <ParallaxImage
                src={images.dakarAeroport}
                alt="L'aéroport international Blaise-Diagne de Dakar, illuminé de nuit"
                className="aspect-[16/9] rounded-sm"
                sizes="(min-width: 768px) 55vw, 100vw"
                strength={6}
                position="72% center"
              />
              {/* Crédit requis par la licence CC BY-SA 4.0 */}
              <p className="mt-4 flex flex-wrap justify-between gap-2 text-[0.68rem] font-semibold tracking-[0.25em] text-encre/50 uppercase">
                <span>Dakar — Aéroport international Blaise-Diagne</span>
                <a
                  href="https://commons.wikimedia.org/wiki/File:A%C3%A9roport_international_Blaise_Diagne.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium tracking-normal normal-case hover:text-vert-900"
                >
                  Photo : DIOP BARKA, CC BY-SA 4.0
                </a>
              </p>
            </div>
            <div>
              <Reveal>
                <h2 className="text-3xl leading-tight font-bold tracking-tight text-vert-900 md:text-[2.6rem]">
                  Celui qui dirige{" "}
                  <span className="font-serif font-medium italic">comme celui qui sert.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-encre/70 md:text-lg">
                  Notre devise résume notre conception du protocole : du chef de délégation à l&apos;équipe
                  d&apos;accueil, chaque personne reçoit la même attention, la même rigueur et le même respect.
                  C&apos;est ainsi que naissent les événements dont on se souvient.
                </p>
              </Reveal>
              <ul className="mt-10">
                {publics.map((item, i) => (
                  <li key={item}>
                    <DrawLine className="bg-vert-900/15" delay={i * 0.1} />
                    <Reveal delay={0.1 + i * 0.1} className="flex items-center justify-between py-4">
                      <span className="text-lg font-semibold text-vert-900">{item}</span>
                      <span className="text-xs font-semibold tracking-[0.2em] text-or">0{i + 1}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

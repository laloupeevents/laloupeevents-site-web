import Image from "next/image";
import { Button, Eyebrow } from "@/components/ui/elements";
import { ParallaxImage, Reveal, SplitWords } from "@/components/ui/motion";
import { ModulesList } from "@/components/sections/ModulesList";
import { images } from "@/lib/images";
import logoCreme from "@/assets/brand/logo-creme.png";

const BADGE = "Formation certifiante • Académie du Protocole • ";

export function Academie() {
  return (
    <section id="academie" className="relative overflow-hidden bg-vert-950 py-28 text-creme md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow index="05">L&apos;Académie du Protocole</Eyebrow>
            </Reveal>
            <h2 className="mt-8 text-[clamp(2.8rem,7.4vw,7.2rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">
              <SplitWords text="Formation" className="block" />
              <SplitWords text="en protocole." delay={0.12} wordClassName="font-serif font-medium italic tracking-normal text-creme-300" />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-xl text-lg leading-relaxed font-light text-creme/75 md:text-xl">
                L&apos;excellence comportementale au service de l&apos;image de marque de l&apos;État et des
                institutions.
              </p>
            </Reveal>
          </div>

          {/* Badge tournant */}
          <Reveal delay={0.25} className="hidden justify-center lg:col-span-4 lg:flex">
            <div className="relative size-60">
              <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow text-creme/80" aria-hidden>
                <defs>
                  <path id="badge-circle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
                </defs>
                <text className="fill-current text-[12.5px] font-semibold tracking-[0.32em] uppercase">
                  <textPath href="#badge-circle">{BADGE.repeat(2)}</textPath>
                </text>
              </svg>
              <div className="absolute inset-[22%] flex items-center justify-center rounded-full border border-creme/25 bg-vert-900">
                <Image src={logoCreme} alt="" className="h-auto w-[68%]" sizes="100px" />
              </div>
              <p className="sr-only">Formation certifiante — Académie du Protocole</p>
            </div>
          </Reveal>
        </div>

        {/* Images de l'Académie */}
        <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col gap-10 md:col-span-7 md:gap-14">
            <ParallaxImage
              src={images.academieMasterclass}
              alt="Master class « Protocole étatique et événementiel » animée par une formatrice de La Loupe"
              className="aspect-[3/2] rounded-sm"
              sizes="(min-width: 768px) 58vw, 100vw"
            />
            <Reveal className="md:max-w-lg">
              <div className="border-l-2 border-or pl-6">
                <p className="text-lg leading-relaxed text-creme/85 md:text-xl">
                  Des sessions conçues sur mesure pour les équipes des institutions, des ministères et des
                  organisations : une montée en compétences ciblée, immédiatement applicable.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:pt-24">
            <ParallaxImage
              src={images.academieFormatrice}
              alt="Formatrice de La Loupe face aux participants, devant la présentation « Excellence et savoir-faire »"
              className="aspect-[4/5] rounded-sm"
              sizes="(min-width: 768px) 40vw, 100vw"
              strength={8}
            />
          </div>
        </div>

        {/* Programmes */}
        <div className="mt-28 md:mt-40">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h3 className="text-[clamp(2rem,4vw,3.4rem)] leading-none font-bold tracking-tight">
              <SplitWords text="Programmes de formation" />
            </h3>
            <Reveal delay={0.1}>
              <p className="text-sm font-semibold tracking-[0.25em] text-creme/60 uppercase">7 modules</p>
            </Reveal>
          </div>
          <ModulesList />
        </div>

        <Reveal className="mt-20 flex flex-col items-start justify-between gap-8 rounded-sm border border-creme/15 bg-vert-900/60 p-8 md:mt-28 md:flex-row md:items-center md:p-12">
          <div>
            <p className="text-2xl font-bold tracking-tight md:text-3xl">Formez vos équipes au protocole d&apos;État.</p>
            <p className="mt-3 max-w-xl text-creme/70">
              Programme, format et calendrier adaptés à votre institution. Parlons de vos besoins.
            </p>
          </div>
          <Button href="#contact">Demander le programme</Button>
        </Reveal>
      </div>
    </section>
  );
}

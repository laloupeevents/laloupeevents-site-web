import { Eyebrow } from "@/components/ui/elements";
import { Counter, DrawLine, Reveal, SplitWords } from "@/components/ui/motion";
import { chiffres } from "@/lib/content";

export function Chiffres() {
  return (
    <section id="references" className="relative bg-creme-50 py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <Eyebrow index="06" className="text-vert-900">
            Références
          </Eyebrow>
        </Reveal>
        <h2 className="mt-8 text-[clamp(2.3rem,5vw,4.6rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-vert-900">
          <SplitWords text="L'agence" />{" "}
          <SplitWords text="en chiffres." delay={0.1} wordClassName="font-serif font-medium italic tracking-normal" />
        </h2>

        <ul className="mt-16 md:mt-24">
          {chiffres.map((item, i) => (
            <li key={item.title}>
              <DrawLine className="bg-vert-900/20" delay={i * 0.1} />
              <div className="grid gap-6 py-10 md:grid-cols-12 md:items-center md:py-14">
                <Reveal className="flex items-start text-vert-900 md:col-span-7">
                  <span className="mt-[0.12em] mr-2 text-[clamp(2.5rem,6vw,5.5rem)] leading-none font-extralight text-or">+</span>
                  <Counter
                    value={item.value}
                    className="text-[clamp(4.8rem,14vw,12.5rem)] leading-[0.85] font-black tracking-[-0.05em] tabular-nums"
                  />
                </Reveal>
                <Reveal delay={0.15} className="md:col-span-5">
                  <p className="text-xs font-semibold tracking-[0.28em] text-or uppercase">{item.unit}</p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-vert-900 md:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-encre/70">{item.text}</p>
                </Reveal>
              </div>
            </li>
          ))}
        </ul>
        <DrawLine className="bg-vert-900/20" />
      </div>
    </section>
  );
}

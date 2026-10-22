import { Eyebrow } from "@/components/ui/elements";
import { DrawLine, Reveal, SplitWords } from "@/components/ui/motion";
import { pourquoi } from "@/lib/content";

export function Pourquoi() {
  return (
    <section className="relative bg-creme-50 py-28 md:py-40" aria-labelledby="pourquoi-titre">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <Eyebrow index="08" className="text-vert-900">
            Nos engagements
          </Eyebrow>
        </Reveal>
        <h2 id="pourquoi-titre" className="mt-8 text-[clamp(2.3rem,5vw,4.6rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-vert-900">
          <SplitWords text="Pourquoi nous" />{" "}
          <SplitWords text={"choisir\u00a0?"} delay={0.1} wordClassName="font-serif font-medium italic tracking-normal" />
        </h2>

        <div className="mt-16 md:mt-24">
          <div className="hidden grid-cols-12 gap-8 pb-5 text-xs font-semibold tracking-[0.25em] text-encre/50 uppercase md:grid">
            <span className="col-span-3">Critères</span>
            <span className="col-span-4">Notre solution</span>
            <span className="col-span-5">Valeur ajoutée</span>
          </div>
          <ul>
            {pourquoi.map((row, i) => (
              <li key={row.critere}>
                <DrawLine className="bg-vert-900/20" delay={i * 0.08} />
                <Reveal delay={i * 0.08}>
                  <div className="group relative isolate grid gap-2 overflow-hidden px-1 py-8 transition-colors duration-500 hover:text-creme md:grid-cols-12 md:items-center md:gap-8 md:px-5 md:py-10">
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-vert-900 transition-transform duration-700 ease-luxe group-hover:scale-y-100"
                    />
                    <h3 className="text-2xl font-bold tracking-tight text-vert-900 transition-colors duration-500 group-hover:text-creme md:col-span-3 md:text-[1.7rem]">
                      {row.critere}
                    </h3>
                    <p className="text-encre/70 transition-colors duration-500 group-hover:text-creme/75 md:col-span-4 md:text-lg">
                      {row.solution}
                    </p>
                    <p className="flex items-center gap-3 font-serif text-2xl text-vert-900 italic transition-colors duration-500 group-hover:text-creme-300 md:col-span-5 md:text-[1.9rem]">
                      <span aria-hidden className="h-px w-6 bg-or" />
                      {row.valeur}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <DrawLine className="bg-vert-900/20" />
        </div>
      </div>
    </section>
  );
}

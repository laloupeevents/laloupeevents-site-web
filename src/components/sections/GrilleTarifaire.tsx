import { Eyebrow } from "@/components/ui/elements";
import { DrawLine, Reveal, SplitWords } from "@/components/ui/motion";
import { modules } from "@/lib/content";

/** Grille tarifaire des formations (présentiel de groupe), construite depuis les modules. */
export function GrilleTarifaire() {
  return (
    <div id="tarifs" className="mt-24 scroll-mt-28 md:mt-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal>
            <Eyebrow>Grille tarifaire</Eyebrow>
          </Reveal>
          <h3 className="mt-6 text-[clamp(2rem,4vw,3.4rem)] leading-none font-bold tracking-tight">
            <SplitWords text="Nos tarifs de formation" />
          </h3>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-sm leading-relaxed text-creme/65 md:text-right">
            Formations en présentiel de groupe, de 8 à 15 personnes. Tarifs par personne, en FCFA.
          </p>
        </Reveal>
      </div>

      <div className="mt-12">
        {/* En-têtes (grand écran) */}
        <div className="hidden grid-cols-[3rem_1fr_14rem_14rem] gap-6 pb-4 text-[0.68rem] font-semibold tracking-[0.25em] text-creme/50 uppercase md:grid">
          <span>N°</span>
          <span>Formation</span>
          <span>Durée</span>
          <span className="text-right">Tarif / personne</span>
        </div>
        <ol>
          {modules.map((module, i) => (
            <li key={module.title}>
              <DrawLine className="bg-creme/15" delay={i * 0.04} />
              <Reveal delay={i * 0.04} y={20}>
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 py-5 md:grid-cols-[3rem_1fr_14rem_14rem] md:items-center md:gap-6 md:py-6">
                  <span className="text-sm font-semibold text-or">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg leading-snug font-semibold md:text-xl">{module.title}</span>
                  <span className="col-start-2 text-sm text-creme/65 md:col-start-auto md:text-base">
                    {module.duree}
                  </span>
                  <span className="col-start-2 text-lg font-bold whitespace-nowrap text-creme-300 md:col-start-auto md:text-right md:text-xl">
                    {module.tarif}
                    <span className="ml-1.5 text-xs font-semibold text-creme/60">FCFA</span>
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <DrawLine className="bg-creme/15" />
      </div>

      <Reveal>
        <p className="mt-8 text-sm leading-relaxed text-creme/60">
          Le tarif final dépend du format, du lieu et du nombre de participants.{" "}
          <a href="#contact" className="font-semibold text-creme underline underline-offset-4 hover:text-creme-300">
            Demandez un devis personnalisé
          </a>
          .
        </p>
      </Reveal>
    </div>
  );
}

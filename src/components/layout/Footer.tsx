import Image from "next/image";
import { contact, expertises, nav } from "@/lib/content";
import logoSignature from "@/assets/brand/logo-creme-signature.png";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-vert-950 pt-24 pb-10 text-creme md:pt-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image src={logoSignature} alt="La Loupe — Experte en protocole étatique et événementiel" className="h-auto w-56 md:w-72" sizes="288px" />
            <p className="mt-10 max-w-sm font-serif text-2xl leading-snug text-creme/85 italic">
              Celui qui dirige comme celui qui sert.
            </p>
          </div>

          <nav aria-label="Pied de page" className="grid gap-12 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-or uppercase">Navigation</p>
              <ul className="mt-6 space-y-3 text-creme/75">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="transition-colors hover:text-creme">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-or uppercase">Expertises</p>
              <ul className="mt-6 space-y-3 text-creme/75">
                {expertises.map((item) => (
                  <li key={item.title}>
                    <a href={item.href} className="transition-colors hover:text-creme">
                      {item.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#academie" className="transition-colors hover:text-creme">
                    Académie du Protocole
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-or uppercase">Contact</p>
              <ul className="mt-6 space-y-3 text-creme/75">
                <li>
                  <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-creme">
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a href={contact.phoneHref} className="transition-colors hover:text-creme">
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>{contact.city}</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-creme/10 pt-8 text-xs text-creme/45 md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> La Loupe. Tous droits réservés.
          </p>
          <p>Protocole étatique &amp; événementiel — Dakar, Sénégal</p>
          <a href="#top" className="font-semibold tracking-[0.2em] text-creme/70 uppercase transition-colors hover:text-creme">
            Haut de page ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

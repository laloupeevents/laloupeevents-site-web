import { Eyebrow, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/elements";
import { Reveal, SplitWords } from "@/components/ui/motion";
import { ContactForm } from "@/components/sections/ContactForm";
import { contact } from "@/lib/content";

const canaux = [
  { icon: MailIcon, label: "E-mail", value: contact.email, href: `mailto:${contact.email}` },
  { icon: PhoneIcon, label: "Téléphone", value: contact.phoneDisplay, href: contact.phoneHref },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: contact.phoneDisplay,
    href: `https://wa.me/${contact.whatsapp}`,
    external: true,
  },
  { icon: PinIcon, label: "Basée à", value: contact.city },
];

export function Contact() {
  return (
    <section id="contact" className="relative bg-creme py-28 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index="09" className="text-vert-900">
              Contact
            </Eyebrow>
          </Reveal>
          <h2 className="mt-8 text-[clamp(3rem,7vw,6.6rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-vert-900">
            <SplitWords text="Des" />{" "}
            <SplitWords text={"questions\u00a0?"} delay={0.08} wordClassName="font-serif font-medium italic tracking-normal" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-encre/75">
              Nous sommes prêts à faire de votre prochain événement un succès historique.
            </p>
          </Reveal>

          <ul className="mt-12 space-y-3">
            {canaux.map(({ icon: Icon, label, value, href, external }, i) => {
              const content = (
                <>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-vert-900/20 text-vert-900 transition-colors duration-500 group-hover:border-vert-900 group-hover:bg-vert-900 group-hover:text-creme">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[0.68rem] font-semibold tracking-[0.25em] text-encre/50 uppercase">
                      {label}
                    </span>
                    <span className="block text-lg font-semibold text-vert-900">{value}</span>
                  </span>
                </>
              );
              return (
                <Reveal as="li" key={label} delay={0.1 + i * 0.07}>
                  {href ? (
                    <a
                      href={href}
                      className="group flex items-center gap-4"
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4">{content}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

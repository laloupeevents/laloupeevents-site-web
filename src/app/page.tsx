import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Maison } from "@/components/sections/Maison";
import { Expertises } from "@/components/sections/Expertises";
import { Sommets } from "@/components/sections/Sommets";
import { Methode } from "@/components/sections/Methode";
import { Academie } from "@/components/sections/Academie";
import { Chiffres } from "@/components/sections/Chiffres";
import { Galerie } from "@/components/sections/Galerie";
import { Pourquoi } from "@/components/sections/Pourquoi";
import { Citation } from "@/components/sections/Citation";
import { Contact } from "@/components/sections/Contact";
import { contact } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "La Loupe",
  slogan: "Celui qui dirige comme celui qui sert",
  description:
    "Experte en protocole étatique et événementiel : organisation de sommets, conférences internationales, dîners officiels et formation en protocole.",
  email: contact.email,
  telephone: contact.phoneHref.replace("tel:", ""),
  address: { "@type": "PostalAddress", addressLocality: "Dakar", addressCountry: "SN" },
  areaServed: ["Sénégal", "Afrique de l'Ouest"],
  knowsAbout: ["Protocole d'État", "Organisation événementielle", "Formation en protocole", "Diplomatie"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Preloader />
      <Cursor />
      <Header />
      <main id="contenu">
        <Hero />
        <Marquee />
        <Maison />
        <Expertises />
        <Sommets />
        <Methode />
        <Academie />
        <Chiffres />
        <Galerie />
        <Pourquoi />
        <Citation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { InlineScript } from "@/components/providers/InlineScript";
import "./globals.css";

const metropolis = localFont({
  variable: "--font-metropolis",
  display: "swap",
  src: [
    { path: "../fonts/metropolis-latin-200-normal.woff2", weight: "200", style: "normal" },
    { path: "../fonts/metropolis-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/metropolis-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/metropolis-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/metropolis-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/metropolis-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/metropolis-latin-700-italic.woff2", weight: "700", style: "italic" },
    { path: "../fonts/metropolis-latin-800-normal.woff2", weight: "800", style: "normal" },
    { path: "../fonts/metropolis-latin-800-italic.woff2", weight: "800", style: "italic" },
    { path: "../fonts/metropolis-latin-900-normal.woff2", weight: "900", style: "normal" },
  ],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description =
  "La Loupe, experte en protocole étatique et événementiel à Dakar. Organisation de sommets, conférences internationales, dîners officiels et formation certifiante en protocole pour les institutions, gouvernements et organisations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "La Loupe — Experte en protocole étatique et événementiel",
    template: "%s — La Loupe",
  },
  description,
  keywords: [
    "protocole d'État",
    "protocole étatique",
    "organisation événementielle Dakar",
    "agence événementielle Sénégal",
    "formation protocole",
    "sommets",
    "conférences internationales",
    "dîner de gala",
    "visites officielles",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "La Loupe",
    title: "La Loupe — Celui qui dirige comme celui qui sert",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "La Loupe — Experte en protocole étatique et événementiel",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#043927",
};

const introScript = `try{if(sessionStorage.getItem("loupe-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.intro="done"}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${metropolis.variable} ${cormorant.variable} antialiased`}
    >
      <body className="grain min-h-full overflow-x-clip">
        <InlineScript html={introScript} />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-creme focus:px-5 focus:py-3 focus:text-vert-900"
        >
          Aller au contenu
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

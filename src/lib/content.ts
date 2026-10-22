import type { StaticImageData } from "next/image";
import { images } from "./images";

export const contact = {
  email: "laloupeevents@gmail.com",
  phoneDisplay: "+221 76 561 55 17",
  phoneHref: "tel:+221765615517",
  whatsapp: "221765615517",
  city: "Dakar, Sénégal",
};

export const nav = [
  { label: "La Maison", href: "#maison" },
  { label: "Expertises", href: "#expertises" },
  { label: "Méthode", href: "#methode" },
  { label: "Académie", href: "#academie" },
  { label: "Références", href: "#references" },
  { label: "Contact", href: "#contact" },
];

export const marquee = [
  "Sommets",
  "Conférences internationales",
  "Protocole d'État",
  "Visites officielles",
  "Dîners de gala",
  "Formation certifiante",
  "Délégations officielles",
  "Séminaires de haut niveau",
];

export type Expertise = {
  index: string;
  title: string;
  text: string;
  image: StaticImageData;
  alt: string;
  href: string;
};

export const expertises: Expertise[] = [
  {
    index: "01",
    title: "Événementiel",
    text: "Organisation complète de sommets, conférences internationales et séminaires de haut niveau.",
    image: images.receptionToast,
    alt: "Invités portant un toast lors d'un dîner de gala",
    href: "#sommets",
  },
  {
    index: "02",
    title: "Protocole",
    text: "Formation certifiante aux usages diplomatiques et aux règles de préséance étatique.",
    image: images.alleeDrapeaux,
    alt: "Allée bordée de drapeaux nationaux devant un bâtiment institutionnel",
    href: "#academie",
  },
  {
    index: "03",
    title: "Stratégie",
    text: "Accompagnement dans la coordination logistique et la sécurité des délégations officielles.",
    image: images.protocoleDrapeaux,
    alt: "Agente du protocole près d'un cortège officiel, devant une allée de drapeaux dont celui du Sénégal",
    href: "#methode",
  },
];

export const sommets: {
  title: string;
  text: string;
  image: StaticImageData;
  alt: string;
  /** Cadrage de l'image dans le panneau vertical (object-position). */
  position?: string;
}[] = [
  {
    title: "Logistique intégrale",
    text: "De la sélection du site à la gestion des flux de participants : chaque détail est anticipé, chaque déplacement orchestré.",
    image: images.logistiqueSalle,
    alt: "Salle de conférence préparée : tables, carafes d'eau et blocs-notes",
  },
  {
    title: "Coordination VIP",
    text: "Accueil et prise en charge des hautes personnalités (VVIP), dans le respect strict des préséances.",
    image: images.protocoleAccueilVip,
    alt: "Agente du protocole ouvrant la portière d'un véhicule officiel",
  },
  {
    title: "Support technique",
    text: "Interprétariat et traduction pour des échanges fluides entre délégations, quelle que soit la langue.",
    image: images.supportDelegation,
    alt: "Délégué à son pupitre de conférence, micro de délégation en main",
    position: "85% center",
  },
];

export const processus = [
  {
    title: "Conception",
    text: "Analyse des besoins et définition du fil rouge stratégique.",
  },
  {
    title: "Planification",
    text: "Rétroplanning détaillé et gestion budgétaire rigoureuse.",
  },
  {
    title: "Exécution",
    text: "Déploiement sur site avec une coordination en temps réel.",
  },
  {
    title: "Évaluation",
    text: "Rapport d'impact et suivi post-événementiel.",
  },
];

export type Module = {
  title: string;
  text: string;
  image: StaticImageData;
  alt: string;
};

export const modules: Module[] = [
  {
    title: "Préséances & Étiquette",
    text: "Maîtrise de l'ordre hiérarchique officiel.",
    image: images.academieSalle,
    alt: "Master class de protocole étatique dans une salle pavoisée de drapeaux",
  },
  {
    title: "Art de la table",
    text: "Protocole des déjeuners et dîners officiels.",
    image: images.artDeLaTable,
    alt: "Verres alignés sur une table dressée",
  },
  {
    title: "Diversité culturelle",
    text: "Adaptation du protocole aux contextes internationaux.",
    image: images.drapeauxCiel,
    alt: "Drapeaux de plusieurs nations dans le ciel",
  },
  {
    title: "Correspondance",
    text: "Rédaction de notes et invitations diplomatiques.",
    image: images.correspondance,
    alt: "Machine à écrire avec une feuille portant le mot diplomatie",
  },
  {
    title: "Gestion de crise",
    text: "Réactions face aux incidents protocolaires.",
    image: images.protocoleSecurite,
    alt: "Agente du protocole en communication devant des véhicules officiels",
  },
  {
    title: "Image & Média",
    text: "Posture et prise de parole en milieu officiel.",
    image: images.academieIntervention,
    alt: "Formatrice prenant la parole micro en main lors d'une master class",
  },
  {
    title: "Visites d'État",
    text: "Organisation des accueils à l'aéroport et cortèges.",
    image: images.protocoleCortege,
    alt: "Agente du protocole accueillant une délégation près d'un cortège officiel",
  },
];

export const chiffres = [
  {
    value: 200,
    unit: "participants",
    title: "Événements internationaux",
    text: "Conférences internationales organisées avec succès.",
  },
  {
    value: 5000,
    unit: "participants",
    title: "Événements nationaux",
    text: "Rencontre annuelle de la Pentecôte (région de Dakar) — Église AD Sénégal.",
  },
  {
    value: 50,
    unit: "cadres formés",
    title: "Formation",
    text: "Protocole des officiels au Sommet Mondial du Leadership (Sénégal).",
  },
];

export const galerie: { image: StaticImageData; caption: string; alt: string; position?: string }[] = [
  { image: images.academieMasterclass, caption: "Master class — Protocole étatique", alt: "Formatrice au pupitre lors d'une master class de protocole étatique", position: "74% center" },
  { image: images.academieSalle2, caption: "Académie du Protocole", alt: "Master class de protocole étatique, participants et formatrice" },
  { image: images.protocoleDrapeaux, caption: "Accueil des délégations", alt: "Agente du protocole près d'un cortège officiel, devant une allée de drapeaux" },
  { image: images.conferenceIntervenante, caption: "Conférences internationales", alt: "Intervenante prenant la parole lors d'une conférence" },
  { image: images.academieFormatrice, caption: "Formation des cadres", alt: "Formatrice face aux participants, devant la présentation « Excellence et savoir-faire »" },
  { image: images.protocoleAccueilVip, caption: "Coordination VIP", alt: "Agente du protocole ouvrant la portière d'un véhicule officiel" },
  { image: images.soireeGala, caption: "Soirées de gala", alt: "Deux invitées en tenue de soirée lors d'un gala" },
  { image: images.academieSalle, caption: "Séminaires de haut niveau", alt: "Salle de séminaire pavoisée de drapeaux, participants attentifs" },
  { image: images.protocoleSecurite, caption: "Sécurité des délégations", alt: "Agente du protocole en communication devant des véhicules officiels" },
  { image: images.receptionTable, caption: "Réceptions officielles", alt: "Convives réunis autour d'une table de réception" },
  { image: images.academieIntervention, caption: "Prise de parole en milieu officiel", alt: "Formatrice s'adressant aux participants d'une master class" },
];

export const pourquoi = [
  {
    critere: "Expertise protocolaire",
    solution: "Maîtrise absolue des usages étatiques",
    valeur: "Zéro impair diplomatique",
  },
  {
    critere: "Logistique",
    solution: "Gestion de projet à 360°",
    valeur: "Gain de temps et efficacité accrue",
  },
  {
    critere: "Sur-mesure",
    solution: "Formations adaptées aux besoins",
    valeur: "Montée en compétences ciblée",
  },
  {
    critere: "Réseau",
    solution: "Partenariats internationaux",
    valeur: "Accès aux meilleurs sites et prestataires",
  },
];

export const citation = {
  text: "L'organisation millimétrée et la maîtrise du savoir-faire et des usages protocolaires font de notre entreprise votre partenaire pour la transformation de vos idées en expériences marquantes.",
  author: "Fondatrice de La Loupe",
};

export const demandeTypes = [
  "Organisation d'événement",
  "Formation en protocole",
  "Conseil & stratégie",
  "Autre demande",
];

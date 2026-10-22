"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/elements";
import { EASE } from "@/components/ui/motion";
import { contact, demandeTypes } from "@/lib/content";

type Fields = {
  nom: string;
  organisation: string;
  email: string;
  telephone: string;
  type: string;
  message: string;
};

const initial: Fields = {
  nom: "",
  organisation: "",
  email: "",
  telephone: "",
  type: demandeTypes[0],
  message: "",
};

function composeMessage(f: Fields) {
  const lines = [`Objet : ${f.type}`, `Nom : ${f.nom}`];
  if (f.organisation) lines.push(`Organisation : ${f.organisation}`);
  if (f.email) lines.push(`E-mail : ${f.email}`);
  if (f.telephone) lines.push(`Téléphone : ${f.telephone}`);
  if (f.message) lines.push("", f.message);
  return lines.join("\n");
}

/**
 * Formulaire de demande. Sans serveur d'envoi pour l'instant : il prépare le message
 * dans la messagerie du visiteur (ou sur WhatsApp), à destination de La Loupe.
 */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>(initial);
  const [sent, setSent] = useState(false);

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `[Site La Loupe] ${fields.type} — ${fields.nom}`;
    const href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeMessage(fields))}`;
    window.location.href = href;
    setSent(true);
  };

  const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    `Bonjour La Loupe,\n\n${composeMessage(fields)}`.trim(),
  )}`;

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-sm border border-vert-900/10 bg-creme-50 p-6 shadow-[0_40px_80px_-40px_rgba(4,57,39,0.35)] md:p-10"
    >
      <fieldset>
        <legend className="text-xs font-semibold tracking-[0.25em] text-encre/55 uppercase">Votre demande</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {demandeTypes.map((type) => (
            <label key={type} className="cursor-pointer">
              <input
                type="radio"
                name="type"
                value={type}
                checked={fields.type === type}
                onChange={update("type")}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-vert-900/20 px-4 py-2 text-sm font-medium text-vert-900 transition-colors duration-300 peer-checked:border-vert-900 peer-checked:bg-vert-900 peer-checked:text-creme peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-or hover:border-vert-900">
                {type}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-x-6 md:grid-cols-2">
        <Field label="Nom complet" name="nom" required value={fields.nom} onChange={update("nom")} autoComplete="name" />
        <Field
          label="Organisation / Institution"
          name="organisation"
          value={fields.organisation}
          onChange={update("organisation")}
          autoComplete="organization"
        />
        <Field
          label="E-mail"
          name="email"
          type="email"
          required
          value={fields.email}
          onChange={update("email")}
          autoComplete="email"
        />
        <Field
          label="Téléphone"
          name="telephone"
          type="tel"
          value={fields.telephone}
          onChange={update("telephone")}
          autoComplete="tel"
        />
      </div>
      <Field label="Votre message" name="message" required textarea value={fields.message} onChange={update("message")} />

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-vert-900 px-7 py-4 text-sm font-semibold tracking-wide text-creme transition-colors duration-500 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:rounded-full before:bg-vert-700 before:transition-transform before:duration-500 before:ease-luxe hover:before:translate-y-0"
        >
          Envoyer la demande
          <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 rounded-full border border-vert-900/25 px-7 py-4 text-sm font-semibold tracking-wide text-vert-900 transition-colors duration-500 hover:border-vert-900 hover:bg-vert-900 hover:text-creme"
        >
          <WhatsAppIcon className="size-4" />
          Écrire sur WhatsApp
        </a>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-6 text-sm leading-relaxed text-encre/70"
          >
            Votre messagerie s&apos;est ouverte avec la demande pré-remplie. Si rien ne s&apos;est passé,
            écrivez-nous directement à{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold text-vert-900 underline underline-offset-4">
              {contact.email}
            </a>
            .
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  name,
  textarea,
  ...props
}: {
  label: string;
  name: string;
  textarea?: boolean;
  type?: string;
  required?: boolean;
  value: string;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const id = `champ-${name}`;
  const base =
    "peer w-full border-0 border-b border-vert-900/25 bg-transparent px-0 pt-7 pb-3 text-base text-vert-900 placeholder-transparent transition-colors duration-300 focus:border-vert-900 focus:ring-0 focus:outline-none";
  return (
    <div className="relative mt-2">
      {textarea ? (
        <textarea id={id} name={name} rows={4} placeholder={label} className={`${base} resize-none`} {...props} />
      ) : (
        <input id={id} name={name} placeholder={label} className={base} {...props} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1 left-0 text-[0.7rem] font-semibold tracking-[0.2em] text-encre/55 uppercase transition-all duration-300 peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-[0.7rem] peer-focus:font-semibold peer-focus:tracking-[0.2em] peer-focus:uppercase"
      >
        {label}
        {props.required && <span className="text-or"> *</span>}
      </label>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-vert-900 transition-transform duration-500 ease-luxe peer-focus:scale-x-100"
      />
    </div>
  );
}

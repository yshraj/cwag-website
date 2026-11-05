"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

// Partner/affiliation data - links to actual government sports bodies
const partners = [
  {
    name: "Sports Authority of India",
    nameGu: "ભારતીય રમતગમત પ્રાધિકરણ",
    abbreviation: "SAI",
    url: "https://sportsauthorityofindia.gov.in",
  },
  {
    name: "Khelo India",
    nameGu: "ખેલો ઇન્ડિયા",
    abbreviation: "KI",
    url: "https://kheloindia.gov.in",
  },
  {
    name: "Sports Authority of Gujarat",
    nameGu: "ગુજરાત રમતગમત પ્રાધિકરણ",
    abbreviation: "SAG",
    url: "https://sag.gujarat.gov.in",
  },
  {
    name: "Ministry of Youth Affairs & Sports",
    nameGu: "યુવા બાબતો અને રમતગમત મંત્રાલય",
    abbreviation: "MYAS",
    url: "https://yas.gov.in",
  },
  {
    name: "Fit India Movement",
    nameGu: "ફિટ ઇન્ડિયા મૂવમેન્ટ",
    abbreviation: "FI",
    url: "https://fitindia.gov.in",
  },
  {
    name: "MY Bharat",
    nameGu: "માય ભારત",
    abbreviation: "MY",
    url: "https://mybharat.gov.in",
  },
];

export function PartnersSection() {
  const { locale } = useLanguage();

  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            {locale === "gu" ? "સંલગ્નતા" : "Affiliations"}
          </span>
          <h2 className={cn(
            "mt-2 text-2xl font-bold tracking-tight sm:text-3xl",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {locale === "gu" ? "અમારા ભાગીદારો અને સંલગ્નતાઓ" : "Our Partners & Affiliations"}
          </h2>
          <p className={cn(
            "text-muted-foreground mt-2 text-sm",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {locale === "gu" 
              ? "સરકારી રમતગમત સંસ્થાઓ સાથે મળીને કામ કરવું" 
              : "Working together with government sports organizations"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:gap-10"
        >
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-xl border bg-background p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              {/* Logo placeholder - using abbreviation */}
              <div className="bg-muted flex h-16 w-24 items-center justify-center rounded-lg text-xl font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {partner.abbreviation}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className={cn(
                  "text-center",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? partner.nameGu : partner.name}
                </span>
                <ExternalLink className="h-3 w-3" />
              </div>
            </a>
          ))}
        </motion.div>

        <p className={cn(
          "text-muted-foreground mt-8 text-center text-xs",
          locale === "gu" && "font-[var(--font-noto-gujarati)]"
        )}>
          {locale === "gu" 
            ? "* ઉપયોગી લિંક્સ - સત્તાવાર જોડાણ ચકાસણી બાકી છે" 
            : "* Useful links - official affiliations pending verification"}
        </p>
      </div>
    </section>
  );
}

"use client";

import { ExternalLink, FileText, CheckCircle2, Calendar, Building2 } from "lucide-react";
import { motion } from "motion/react";

import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function WorkSection() {
  const { locale } = useLanguage();

  const content = {
    eyebrow: { en: "Our Work", gu: "અમારું કાર્ય" },
    title: {
      en: "Documented Advocacy for Coaches' Welfare",
      gu: "કોચ કલ્યાણ માટે દસ્તાવેજીકૃત હિમાયત",
    },
    intro: {
      en: "CWAG has been publicly documented raising coaches' welfare concerns before relevant authorities.",
      gu: "CWAG સંબંધિત સત્તાવાળાઓ સમક્ષ કોચ કલ્યાણની ચિંતાઓ ઉઠાવતા જાહેરમાં દસ્તાવેજીકૃત થયેલ છે.",
    },
  };

  const representation = {
    date: { en: "21 August 2024", gu: "21 ઓગસ્ટ 2024" },
    title: {
      en: "Representation to Sports Authority of Gujarat",
      gu: "રમતગમત સત્તા ગુજરાતને રજૂઆત",
    },
    description: {
      en: "CWAG submitted a written representation to the Director General of the Sports Authority of Gujarat, raising concerns on behalf of coaches regarding service conditions and welfare matters.",
      gu: "CWAG એ રમતગમત સત્તા ગુજરાતના ડાયરેક્ટર જનરલને લેખિત રજૂઆત સબમિટ કરી, સેવા શરતો અને કલ્યાણ બાબતો અંગે કોચ વતી ચિંતાઓ ઉઠાવી.",
    },
    source: {
      name: "Gujarat Samachar",
      url: "https://english.gujaratsamachar.com/news/gujarat/gujarat-coaches-protest-delay-in-promotions-demand-action-from-sag-15163641624",
    },
  };

  const concerns = [
    {
      title: { en: "Promotions & Seniority", gu: "બઢતી અને વરિષ્ઠતા" },
      description: {
        en: "Raised concerns about 113 coaches recruited in 2016-17 and 2017-18 who had not received promotions despite vacant positions.",
        gu: "2016-17 અને 2017-18માં ભરતી થયેલા 113 કોચ વિશે ચિંતા ઉઠાવી જેમને ખાલી જગ્યાઓ હોવા છતાં બઢતી મળી ન હતી.",
      },
    },
    {
      title: { en: "Pension Administration", gu: "પેન્શન વહીવટ" },
      description: {
        en: "Addressed pending allocation of New Pension Scheme accounts for coaches.",
        gu: "કોચ માટે નવી પેન્શન યોજના ખાતાઓની બાકી ફાળવણીને સંબોધિત કરી.",
      },
    },
    {
      title: { en: "Group Insurance", gu: "જૂથ વીમો" },
      description: {
        en: "Raised concerns about pending group-insurance benefits for coaches.",
        gu: "કોચ માટે બાકી જૂથ-વીમા લાભો અંગે ચિંતાઓ ઉઠાવી.",
      },
    },
    {
      title: { en: "Administrative Matters", gu: "વહીવટી બાબતો" },
      description: {
        en: "Discussed vacancies and departmental administrative concerns affecting coaches.",
        gu: "કોચને અસર કરતી ખાલી જગ્યાઓ અને વિભાગીય વહીવટી ચિંતાઓની ચર્ચા કરી.",
      },
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-[#f59e0b] text-sm font-semibold uppercase tracking-wider">
            {content.eyebrow[locale]}
          </span>
          <h2 className={cn(
            "mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
            locale === "gu" && "font-[var(--font-noto-gujarati)] text-2xl sm:text-3xl lg:text-4xl"
          )}>
            {content.title[locale]}
          </h2>
          <p className={cn(
            "mt-6 text-muted-foreground text-lg",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {content.intro[locale]}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl border shadow-lg overflow-hidden">
            {/* Card Header */}
            <div className="bg-primary/5 border-b px-8 py-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full px-4 py-1.5 text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {locale === "gu" ? "ચકાસાયેલ" : "Verified"}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4" />
                  {representation.date[locale]}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Building2 className="h-4 w-4" />
                  {locale === "gu" ? "રમતગમત સત્તા ગુજરાત" : "Sports Authority of Gujarat"}
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8">
              <h3 className={cn(
                "text-2xl font-bold",
                locale === "gu" && "font-[var(--font-noto-gujarati)] text-xl"
              )}>
                {representation.title[locale]}
              </h3>
              <p className={cn(
                "mt-4 text-muted-foreground leading-relaxed",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {representation.description[locale]}
              </p>

              {/* Concerns List */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {concerns.map((concern, index) => (
                  <motion.div
                    key={concern.title.en}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-muted/50"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className={cn(
                        "font-semibold text-sm",
                        locale === "gu" && "font-[var(--font-noto-gujarati)]"
                      )}>
                        {concern.title[locale]}
                      </h4>
                      <p className={cn(
                        "text-muted-foreground text-xs mt-1 leading-relaxed",
                        locale === "gu" && "font-[var(--font-noto-gujarati)]"
                      )}>
                        {concern.description[locale]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Source */}
              <div className="mt-8 pt-6 border-t">
                <p className={cn(
                  "text-sm text-muted-foreground",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? "સ્ત્રોત:" : "Source:"}{" "}
                  <a
                    href={representation.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {representation.source.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
                <p className={cn(
                  "text-xs text-muted-foreground mt-2 italic",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" 
                    ? "નોંધ: આ દસ્તાવેજીકૃત હિમાયત પ્રવૃત્તિ છે. પરિણામો અને અનુગામી વિકાસ પુષ્ટિ માટે બાકી છે." 
                    : "Note: This is documented advocacy activity. Outcomes and subsequent developments are pending confirmation."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

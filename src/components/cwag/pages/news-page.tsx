"use client";

import { Calendar, ExternalLink, FileText, Info } from "lucide-react";
import { motion } from "motion/react";

import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function NewsPageContent() {
  const { t, locale } = useLanguage();

  const verifiedNews = {
    title: {
      en: "Gujarat Coaches Protest Delay in Promotions, Demand Action from SAG",
      gu: "ગુજરાત કોચ બઢતીમાં વિલંબનો વિરોધ કરે છે, SAG પાસેથી કાર્યવાહીની માંગ",
    },
    description: {
      en: "CWAG submitted a written representation to the Director General of the Sports Authority of Gujarat, raising concerns on behalf of coaches regarding service conditions and welfare matters including promotions, pension administration, and group insurance benefits.",
      gu: "CWAG એ રમતગમત સત્તા ગુજરાતના ડાયરેક્ટર જનરલને લેખિત રજૂઆત સબમિટ કરી, બઢતી, પેન્શન વહીવટ અને જૂથ વીમા લાભો સહિત સેવા શરતો અને કલ્યાણ બાબતો અંગે કોચ વતી ચિંતાઓ ઉઠાવી.",
    },
    date: "21 August 2024",
    dateGu: "21 ઓગસ્ટ 2024",
    source: "Gujarat Samachar",
    sourceUrl: "https://english.gujaratsamachar.com/news/gujarat/gujarat-coaches-protest-delay-in-promotions-demand-action-from-sag-15163641624",
  };

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-orange-50/20 dark:from-primary/10 dark:to-background py-12 lg:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("news.title")}
            </h1>
            <p className={cn(
              "text-muted-foreground mt-4 text-lg",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {locale === "gu" ? "ચકાસાયેલ સમાચાર અને દસ્તાવેજીકૃત પ્રવૃત્તિઓ" : "Verified news and documented activities"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Verified News */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl"
          >
            <div className="rounded-xl border-2 border-green-200 dark:border-green-900/50 bg-card overflow-hidden">
              <div className="bg-green-50 dark:bg-green-900/20 px-6 py-4 border-b border-green-200 dark:border-green-900/50">
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {locale === "gu" ? "ચકાસાયેલ" : "Verified"}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {locale === "gu" ? "મીડિયા કવરેજ" : "Media Coverage"}
                  </span>
                </div>
              </div>
              
              <div className="p-6 lg:p-8">
                <h2 className={cn(
                  "text-xl lg:text-2xl font-bold",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {verifiedNews.title[locale]}
                </h2>
                
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {locale === "gu" ? verifiedNews.dateGu : verifiedNews.date}
                  </span>
                </div>
                
                <p className={cn(
                  "mt-6 text-muted-foreground leading-relaxed",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {verifiedNews.description[locale]}
                </p>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-3">
                    {locale === "gu" ? "સ્ત્રોત:" : "Source:"}
                  </p>
                  <a
                    href={verifiedNews.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {verifiedNews.source}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* More News Coming Soon */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl"
          >
            <div className="rounded-xl border-2 border-dashed border-muted-foreground/20 bg-card p-8 text-center">
              <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                <Info className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className={cn(
                "text-lg font-semibold",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {locale === "gu" ? "વધુ સમાચાર આવી રહ્યા છે" : "More News Coming Soon"}
              </h3>
              <p className={cn(
                "text-muted-foreground mt-3 max-w-md mx-auto text-sm",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {locale === "gu"
                  ? "ચકાસાયેલ સમાચાર અને સત્તાવાર જાહેરાતો ઉપલબ્ધ થતાં અહીં પ્રકાશિત કરવામાં આવશે. CWAG માત્ર દસ્તાવેજીકૃત અને ચકાસાયેલ માહિતી શેર કરે છે."
                  : "Verified news and official announcements will be published here as they become available. CWAG shares only documented and verified information."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

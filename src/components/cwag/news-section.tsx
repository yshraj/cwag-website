"use client";

import Link from "next/link";

import { ArrowRight, Calendar, ExternalLink, FileText, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function NewsSection() {
  const { t, locale } = useLanguage();

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              {locale === "gu" ? "દસ્તાવેજીકૃત" : "Documented"}
            </span>
            <h2 className={cn(
              "mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("news.title")}
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/news" className="gap-2">
              {t("news.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Verified News Article - Gujarat Samachar */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group col-span-1 lg:col-span-2 overflow-hidden rounded-2xl border-2 border-primary/20 bg-card"
          >
            <div className="p-6 lg:p-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {locale === "gu" ? "ચકાસાયેલ" : "Verified"}
                </span>
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
                  {locale === "gu" ? "મીડિયા કવરેજ" : "Media Coverage"}
                </span>
              </div>
              
              <h3 className={cn(
                "text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {t("news.verified.title")}
              </h3>
              
              <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {t("news.verified.date")}
                </span>
                <span>
                  {locale === "gu" ? "સ્ત્રોત:" : "Source:"} {t("news.verified.source")}
                </span>
              </div>
              
              <p className={cn(
                "text-muted-foreground mt-4 text-base leading-relaxed",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {t("news.verified.summary")}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <a 
                  href={t("news.verified.sourceUrl")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {locale === "gu" ? "મૂળ લેખ વાંચો" : "Read Original Article"}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.article>

          {/* Placeholder for future news */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-dashed bg-muted/30 p-6"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className={cn(
                  "font-medium",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? "વધુ સમાચાર આવી રહ્યા છે" : "More News Coming Soon"}
                </h4>
                <p className={cn(
                  "text-muted-foreground mt-1 text-sm",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" 
                    ? "ચકાસાયેલ સમાચાર અને સત્તાવાર જાહેરાતો ઉપલબ્ધ થતાં અહીં પ્રકાશિત કરવામાં આવશે."
                    : "Verified news and official announcements will be published here as they become available."}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-dashed bg-muted/30 p-6"
          >
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className={cn(
                  "font-medium",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? "સત્તાવાર અપડેટ્સ" : "Official Updates"}
                </h4>
                <p className={cn(
                  "text-muted-foreground mt-1 text-sm",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" 
                    ? "CWAG તરફથી સત્તાવાર જાહેરાતો અને અપડેટ્સ માટે આ જગ્યા આરક્ષિત છે."
                    : "This space is reserved for official announcements and updates from CWAG."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <p className={cn(
          "text-muted-foreground mt-8 text-center text-xs",
          locale === "gu" && "font-[var(--font-noto-gujarati)]"
        )}>
          {locale === "gu" 
            ? "* માત્ર ચકાસાયેલ સમાચાર અને દસ્તાવેજીકૃત પ્રવૃત્તિઓ પ્રકાશિત કરવામાં આવે છે" 
            : "* Only verified news and documented activities are published"}
        </p>
      </div>
    </section>
  );
}

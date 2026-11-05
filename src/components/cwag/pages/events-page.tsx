"use client";

import Link from "next/link";

import { Calendar, Mail } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function EventsPageContent() {
  const { t, locale } = useLanguage();

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
              {t("events.title")}
            </h1>
            <p className={cn(
              "text-muted-foreground mt-4 text-lg",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("events.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl"
          >
            <div className="rounded-xl border-2 border-dashed border-muted-foreground/20 bg-card p-12 text-center">
              <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-10 w-10 text-primary" />
              </div>
              <h2 className={cn(
                "text-2xl font-bold",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {locale === "gu" ? "કાર્યક્રમો આયોજન હેઠળ" : "Events Being Planned"}
              </h2>
              <p className={cn(
                "text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {locale === "gu" 
                  ? "CWAG વર્કશોપ્સ, સેમિનાર અને નેટવર્કિંગ ઇવેન્ટ્સનું આયોજન કરી રહ્યું છે. કાર્યક્રમોની જાહેરાત થતાં તેમની વિગતો અહીં પ્રકાશિત કરવામાં આવશે."
                  : "CWAG is organizing workshops, seminars, and networking events. Event details will be published here as they are announced."}
              </p>
              
              <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                <h3 className={cn(
                  "font-semibold mb-2",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? "સૂચિત પ્રવૃત્તિઓ" : "Planned Activities"}
                </h3>
                <ul className={cn(
                  "text-muted-foreground text-sm space-y-2",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  <li>{locale === "gu" ? "• કોચિંગ વર્કશોપ્સ" : "• Coaching workshops"}</li>
                  <li>{locale === "gu" ? "• વાર્ષિક કોચ મીટ" : "• Annual coaches meet"}</li>
                  <li>{locale === "gu" ? "• કલ્યાણ માહિતી સત્રો" : "• Welfare information sessions"}</li>
                  <li>{locale === "gu" ? "• સ્પોર્ટ્સ સાયન્સ સેમિનાર" : "• Sports science seminars"}</li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Button asChild>
                  <Link href="/contact" className="gap-2">
                    <Mail className="h-4 w-4" />
                    {locale === "gu" ? "અપડેટ્સ માટે સંપર્ક કરો" : "Contact for Updates"}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={cn(
              "text-muted-foreground mt-8 text-center text-sm",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}
          >
            {locale === "gu"
              ? "કાર્યક્રમોની માહિતી ઉપલબ્ધ થતાં અહીં અપડેટ કરવામાં આવશે."
              : "This page will be updated as event information becomes available."}
          </motion.p>
        </div>
      </section>
    </div>
  );
}

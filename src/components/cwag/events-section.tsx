"use client";

import Link from "next/link";

import { ArrowRight, Calendar, Info } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function EventsSection() {
  const { t, locale } = useLanguage();

  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            {locale === "gu" ? "પ્રવૃત્તિઓ" : "Activities"}
          </span>
          <h2 className={cn(
            "mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {t("events.title")}
          </h2>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-12 mx-auto max-w-2xl"
        >
          <div className="rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-card p-8 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className={cn(
              "text-xl font-semibold",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {locale === "gu" ? "કાર્યક્રમો ટૂંક સમયમાં" : "Events Coming Soon"}
            </h3>
            <p className={cn(
              "text-muted-foreground mt-3 max-w-md mx-auto",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {locale === "gu" 
                ? "CWAG આગામી કાર્યક્રમો, વર્કશોપ્સ અને મીટિંગ્સની યોજના બનાવી રહ્યું છે. અપડેટ્સ માટે ચેક કરતા રહો."
                : "CWAG is planning upcoming events, workshops, and meetings. Check back for updates as they are announced."}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/contact" className="gap-2">
                  <Info className="h-4 w-4" />
                  {locale === "gu" ? "અમારો સંપર્ક કરો" : "Contact Us"}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Button variant="ghost" asChild>
            <Link href="/events" className="gap-2 text-muted-foreground">
              {locale === "gu" ? "કાર્યક્રમ પૃષ્ઠ જુઓ" : "View Events Page"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

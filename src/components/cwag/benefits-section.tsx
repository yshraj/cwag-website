"use client";

import Link from "next/link";

import {
  GraduationCap,
  Building2,
  Users,
  Award,
  Heart,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

const benefitIcons = [
  GraduationCap,
  Building2,
  Users,
  Award,
  Heart,
  BookOpen,
];

export function BenefitsSection() {
  const { t, locale, dictionary } = useLanguage();

  const benefits = dictionary.membership.benefits.items;

  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            {locale === "gu" ? "સભ્યપદ" : "Membership"}
          </span>
          <h2 className={cn(
            "mt-3 text-3xl font-bold tracking-tight sm:text-4xl",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {t("membership.benefits.title")}
          </h2>
          <p className={cn(
            "text-muted-foreground mt-4 text-lg",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {t("membership.subtitle")}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit: { title: string; description: string }, index: number) => {
            const Icon = benefitIcons[index] || GraduationCap;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 inline-flex rounded-xl p-3 transition-colors">
                  <Icon className="text-primary h-6 w-6" />
                </div>
                <h3 className={cn(
                  "text-lg font-semibold",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {benefit.title}
                </h3>
                <p className={cn(
                  "text-muted-foreground mt-2 text-sm leading-relaxed",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button size="lg" asChild>
            <Link href="/membership" className="gap-2">
              {t("membership.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

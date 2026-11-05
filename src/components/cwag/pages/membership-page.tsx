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
  CheckCircle2,
  UserPlus,
  Shield,
  Briefcase,
  Building,
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

const membershipCategories = [
  {
    id: "active",
    name: "Active Coach",
    nameGu: "સક્રિય કોચ",
    description: "For currently practicing sports coaches",
    descriptionGu: "હાલમાં પ્રેક્ટિસ કરતા રમતગમત કોચ માટે",
    icon: Briefcase,
    features: [
      "Full voting rights",
      "All welfare benefits",
      "Training program access",
      "Recognition eligibility",
    ],
    featuresGu: [
      "સંપૂર્ણ મતદાન અધિકારો",
      "બધા કલ્યાણ લાભો",
      "તાલીમ કાર્યક્રમ ઍક્સેસ",
      "માન્યતા પાત્રતા",
    ],
  },
  {
    id: "retired",
    name: "Retired Coach",
    nameGu: "નિવૃત્ત કોચ",
    description: "For retired sports coaches",
    descriptionGu: "નિવૃત્ત રમતગમત કોચ માટે",
    icon: Shield,
    features: [
      "Advisory role eligibility",
      "Welfare benefits",
      "Event participation",
      "Community access",
    ],
    featuresGu: [
      "સલાહકાર ભૂમિકા પાત્રતા",
      "કલ્યાણ લાભો",
      "કાર્યક્રમ ભાગીદારી",
      "સમુદાય ઍક્સેસ",
    ],
  },
  {
    id: "associate",
    name: "Associate Member",
    nameGu: "સહયોગી સભ્ય",
    description: "For sports professionals and enthusiasts",
    descriptionGu: "રમતગમત વ્યાવસાયિકો અને ઉત્સાહીઓ માટે",
    icon: Users,
    features: [
      "Event participation",
      "Networking access",
      "Newsletter updates",
      "Workshop eligibility",
    ],
    featuresGu: [
      "કાર્યક્રમ ભાગીદારી",
      "નેટવર્કિંગ ઍક્સેસ",
      "ન્યૂઝલેટર અપડેટ્સ",
      "વર્કશોપ પાત્રતા",
    ],
  },
  {
    id: "institutional",
    name: "Institutional Member",
    nameGu: "સંસ્થાકીય સભ્ય",
    description: "For academies and sports institutions",
    descriptionGu: "એકેડેમીઓ અને રમતગમત સંસ્થાઓ માટે",
    icon: Building,
    features: [
      "Multiple coach registrations",
      "Institutional recognition",
      "Bulk program access",
      "Partnership opportunities",
    ],
    featuresGu: [
      "બહુવિધ કોચ નોંધણી",
      "સંસ્થાકીય માન્યતા",
      "જથ્થાબંધ પ્રોગ્રામ ઍક્સેસ",
      "ભાગીદારીની તકો",
    ],
  },
];

export function MembershipPageContent() {
  const { t, locale, dictionary } = useLanguage();
  const benefits = dictionary.membership.benefits.items;

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-orange-50/20 py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              {locale === "gu" ? "અમારા સાથે જોડાઓ" : "Join Us"}
            </span>
            <h1 className={cn(
              "mt-4 text-4xl font-bold tracking-tight sm:text-5xl",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("membership.title")}
            </h1>
            <p className={cn(
              "text-muted-foreground mt-6 text-lg leading-relaxed",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("membership.subtitle")}
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/register" className="gap-2">
                  <UserPlus className="h-5 w-5" />
                  {t("membership.cta")}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("membership.benefits.title")}
            </h2>
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
                  className="rounded-2xl border bg-card p-6"
                >
                  <div className="bg-primary/10 mb-4 inline-flex rounded-xl p-3">
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
        </div>
      </section>

      {/* Membership Categories */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("membership.categories.title")}
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {membershipCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border bg-background p-6 transition-all hover:shadow-lg"
              >
                <div className="bg-primary/10 mb-4 inline-flex rounded-xl p-3">
                  <category.icon className="text-primary h-6 w-6" />
                </div>
                <h3 className={cn(
                  "text-lg font-semibold",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? category.nameGu : category.name}
                </h3>
                <p className={cn(
                  "text-muted-foreground mt-2 text-sm",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? category.descriptionGu : category.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {(locale === "gu" ? category.featuresGu : category.features).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                      <span className={cn(
                        "text-muted-foreground",
                        locale === "gu" && "font-[var(--font-noto-gujarati)]"
                      )}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <p className={cn(
            "text-muted-foreground mt-8 text-center text-xs",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {locale === "gu" 
              ? "* સભ્યપદ ફી અને વિગતવાર માહિતી માટે સંપર્ક કરો" 
              : "* Contact for membership fees and detailed information"}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="bg-primary mx-auto max-w-4xl rounded-3xl px-8 py-12 text-center text-primary-foreground lg:px-16">
            <h2 className={cn(
              "text-2xl font-bold sm:text-3xl",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("cta.joinCommunity")}
            </h2>
            <p className={cn(
              "mx-auto mt-4 max-w-xl text-primary-foreground/80",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("cta.joinText")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register" className="gap-2">
                  <UserPlus className="h-5 w-5" />
                  {t("cta.registerNow")}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/contact" className="gap-2">
                  {t("cta.contactUs")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

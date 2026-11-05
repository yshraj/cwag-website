"use client";

import { Target, Eye, CheckCircle2, Users, Trophy, Medal, Award } from "lucide-react";
import { motion } from "motion/react";

import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

// Placeholder leadership data - To be updated with official information
const leadershipData = [
  {
    name: "To Be Announced",
    nameGu: "જાહેર કરવાનું બાકી",
    role: "President",
    roleGu: "પ્રમુખ",
    placeholder: true,
  },
  {
    name: "To Be Announced",
    nameGu: "જાહેર કરવાનું બાકી",
    role: "Vice President",
    roleGu: "ઉપપ્રમુખ",
    placeholder: true,
  },
  {
    name: "To Be Announced",
    nameGu: "જાહેર કરવાનું બાકી",
    role: "General Secretary",
    roleGu: "મહામંત્રી",
    placeholder: true,
  },
  {
    name: "To Be Announced",
    nameGu: "જાહેર કરવાનું બાકી",
    role: "Treasurer",
    roleGu: "ખજાનચી",
    placeholder: true,
  },
  {
    name: "To Be Announced",
    nameGu: "જાહેર કરવાનું બાકી",
    role: "Joint Secretary",
    roleGu: "સંયુક્ત મંત્રી",
    placeholder: true,
  },
  {
    name: "To Be Announced",
    nameGu: "જાહેર કરવાનું બાકી",
    role: "Executive Member",
    roleGu: "કાર્યકારી સભ્ય",
    placeholder: true,
  },
];

export function AboutPageContent() {
  const { t, locale, dictionary } = useLanguage();
  const objectives = dictionary.about.objectives.items;

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
              {t("about.shortTitle")}
            </span>
            <h1 className={cn(
              "mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("about.title")}
            </h1>
            <p className={cn(
              "text-muted-foreground mt-6 text-lg leading-relaxed",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("about.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border bg-card p-8"
            >
              <div className="bg-primary/10 mb-4 inline-flex rounded-xl p-3">
                <Target className="text-primary h-8 w-8" />
              </div>
              <h2 className={cn(
                "text-2xl font-bold",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {t("about.mission.title")}
              </h2>
              <p className={cn(
                "text-muted-foreground mt-4 leading-relaxed",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {t("about.mission.text")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border bg-card p-8"
            >
              <div className="bg-primary/10 mb-4 inline-flex rounded-xl p-3">
                <Eye className="text-primary h-8 w-8" />
              </div>
              <h2 className={cn(
                "text-2xl font-bold",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {t("about.vision.title")}
              </h2>
              <p className={cn(
                "text-muted-foreground mt-4 leading-relaxed",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {t("about.vision.text")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
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
              {t("about.objectives.title")}
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {objectives.map((objective: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-xl border bg-background p-6"
              >
                <CheckCircle2 className="text-primary mt-0.5 h-6 w-6 shrink-0" />
                <span className={cn(
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {objective}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-16 lg:py-24">
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
              {t("about.leadership.title")}
            </h2>
            <p className={cn(
              "text-muted-foreground mt-4",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("about.leadership.subtitle")}
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipData.map((leader, index) => (
              <motion.div
                key={leader.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 bg-muted/50">
                  <div className="flex h-full items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                </div>
                <h3 className={cn(
                  "text-lg font-semibold text-muted-foreground italic",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? leader.nameGu : leader.name}
                </h3>
                <p className={cn(
                  "text-primary text-sm font-medium",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? leader.roleGu : leader.role}
                </p>
              </motion.div>
            ))}
          </div>

          <p className={cn(
            "text-muted-foreground mt-8 text-center text-xs",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {locale === "gu" 
              ? "* નેતૃત્વની માહિતી સત્તાવાર વિગતો સાથે અપડેટ કરવામાં આવશે" 
              : "* Leadership information will be updated with official details"}
          </p>
        </div>
      </section>

      {/* Scope - factual information only */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { value: "2024", label: locale === "gu" ? "સ્થાપના" : "Established", icon: Trophy },
              { value: "34", label: locale === "gu" ? "જિલ્લાઓ" : "Districts in Gujarat", icon: Medal },
              { value: "18+", label: locale === "gu" ? "રમતગમત શાખાઓ" : "Sports Disciplines", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="mx-auto mb-3 h-8 w-8 opacity-80" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className={cn(
                  "mt-1 text-sm opacity-80",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

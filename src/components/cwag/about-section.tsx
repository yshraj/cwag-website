"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Shield, Users, Award } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const { locale } = useLanguage();

  const content = {
    eyebrow: { en: "About CWAG", gu: "CWAG વિશે" },
    title: {
      en: "A Collective Voice for Gujarat's Sports Coaches",
      gu: "ગુજરાતના રમતગમત કોચ માટે સામૂહિક અવાજ",
    },
    description: {
      en: "The Coaches' Welfare Association of Gujarat (CWAG) represents the interests and welfare concerns of sports coaches in Gujarat. The association provides a collective platform for representing coaches' concerns and engaging with relevant authorities on matters affecting their professional welfare.",
      gu: "કોચ વેલ્ફેર એસોસિએશન ગુજરાત (CWAG) ગુજરાતમાં રમતગમત કોચના હિતો અને કલ્યાણની ચિંતાઓનું પ્રતિનિધિત્વ કરે છે. સંગઠન કોચની ચિંતાઓનું પ્રતિનિધિત્વ કરવા અને તેમના વ્યાવસાયિક કલ્યાણને અસર કરતા મામલાઓ પર સંબંધિત સત્તાવાળાઓ સાથે જોડાણ માટે સામૂહિક પ્લેટફોર્મ પૂરું પાડે છે.",
    },
    learnMore: { en: "Learn More About Us", gu: "અમારા વિશે વધુ જાણો" },
  };

  const pillars = [
    {
      icon: Award,
      title: { en: "Recognition", gu: "માન્યતા" },
      description: {
        en: "Advocating for the recognition of coaches' vital role in developing athletes and strengthening Gujarat's sports ecosystem.",
        gu: "ખેલાડીઓના વિકાસ અને ગુજરાતની રમતગમત ઇકોસિસ્ટમને મજબૂત કરવામાં કોચની મહત્વપૂર્ણ ભૂમિકાની માન્યતા માટે હિમાયત.",
      },
    },
    {
      icon: Users,
      title: { en: "Representation", gu: "પ્રતિનિધિત્વ" },
      description: {
        en: "Providing a collective platform for coaches to raise concerns and engage with relevant authorities on service-related matters.",
        gu: "સેવા-સંબંધિત બાબતો પર ચિંતાઓ ઉઠાવવા અને સંબંધિત સત્તાવાળાઓ સાથે જોડાણ માટે કોચને સામૂહિક પ્લેટફોર્મ પૂરું પાડવું.",
      },
    },
    {
      icon: Shield,
      title: { en: "Welfare", gu: "કલ્યાણ" },
      description: {
        en: "Addressing matters relating to professional welfare, including promotions, pension administration, and insurance benefits.",
        gu: "બઢતી, પેન્શન વહીવટ અને વીમા લાભો સહિત વ્યાવસાયિક કલ્યાણ સંબંધિત મામલાઓને સંબોધિત કરવા.",
      },
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-muted">
              <Image
                src="/images/coaching/team-huddle.jpg"
                alt="Sports coaching session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
              "mt-6 text-muted-foreground text-lg leading-relaxed",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {content.description[locale]}
            </p>

            <div className="mt-8">
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/about">
                  {content.learnMore[locale]}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-xl border bg-card"
            >
              <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <pillar.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className={cn(
                "text-lg font-semibold",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {pillar.title[locale]}
              </h3>
              <p className={cn(
                "mt-2 text-muted-foreground text-sm leading-relaxed",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {pillar.description[locale]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

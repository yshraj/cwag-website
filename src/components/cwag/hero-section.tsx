"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Users } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { locale } = useLanguage();

  const headline = {
    en: "Recognising the People Behind Every Sporting Achievement",
    gu: "દરેક રમતગમત સિદ્ધિ પાછળના લોકોને માન્યતા આપવી",
  };

  const subheadline = {
    en: "The Coaches' Welfare Association of Gujarat represents the professional interests and welfare of sports coaches—providing a collective platform for recognition, representation, and support.",
    gu: "કોચ વેલ્ફેર એસોસિએશન ગુજરાત રમતગમત કોચના વ્યાવસાયિક હિતો અને કલ્યાણનું પ્રતિનિધિત્વ કરે છે—માન્યતા, પ્રતિનિધિત્વ અને સમર્થન માટે સામૂહિક પ્લેટફોર્મ પૂરું પાડે છે.",
  };

  const cta = {
    primary: { en: "Become a Member", gu: "સભ્ય બનો" },
    secondary: { en: "Know About CWAG", gu: "CWAG વિશે જાણો" },
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden bg-[#0a0f1a]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/athletics-track.jpg"
          alt="Athletics track - sports coaching environment"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/95 via-[#0a0f1a]/70 to-[#0a0f1a]/30 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/80 via-transparent to-[#0a0f1a]/20" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex min-h-[90vh] lg:min-h-screen items-center">
        <div className="max-w-3xl py-32 lg:py-40">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm border border-white/10">
              <span className="h-2 w-2 rounded-full bg-[#f59e0b] animate-pulse" />
              {locale === "gu" ? "ગુજરાતના કોચનું પ્રતિનિધિત્વ" : "Representing Gujarat's Coaches"}
            </span>
          </motion.div>

          {/* Gold Accent Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 h-1 bg-gradient-to-r from-[#f59e0b] to-[#d97706] rounded-full"
          />

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn(
              "mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]",
              locale === "gu" && "font-[var(--font-noto-gujarati)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
            )}
          >
            {headline[locale]}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={cn(
              "mt-6 text-lg text-white/80 leading-relaxed max-w-2xl lg:text-xl",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}
          >
            {subheadline[locale]}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0a0f1a] font-semibold h-14 px-8 text-base gap-2"
              asChild
            >
              <Link href="/membership">
                <Users className="h-5 w-5" />
                {cta.primary[locale]}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/50 h-14 px-8 text-base gap-2 backdrop-blur-sm"
              asChild
            >
              <Link href="/about">
                {cta.secondary[locale]}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Quick Info - removed decorative numbering */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 flex flex-wrap gap-8 border-t border-white/10 pt-8"
          >
            {[
              { 
                label: locale === "gu" ? "કલ્યાણ" : "Welfare", 
                desc: locale === "gu" ? "કોચ અધિકારો" : "Coach Rights" 
              },
              { 
                label: locale === "gu" ? "પ્રતિનિધિત્વ" : "Representation", 
                desc: locale === "gu" ? "સામૂહિક અવાજ" : "Collective Voice" 
              },
              { 
                label: locale === "gu" ? "માન્યતા" : "Recognition", 
                desc: locale === "gu" ? "વ્યાવસાયિક" : "Professional" 
              },
            ].map((item) => (
              <div key={item.label} className="text-left">
                <div className={cn(
                  "text-white font-semibold",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {item.label}
                </div>
                <div className={cn(
                  "text-white/60 text-sm mt-0.5",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {item.desc}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}

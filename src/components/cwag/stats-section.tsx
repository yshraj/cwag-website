"use client";

import Image from "next/image";

import { motion } from "motion/react";

import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function StatsSection() {
  const { locale } = useLanguage();

  const content = {
    title: {
      en: "Representing Coaches Across Gujarat",
      gu: "સમગ્ર ગુજરાતમાં કોચનું પ્રતિનિધિત્વ",
    },
    stats: [
      {
        value: "34",
        label: { en: "Districts", gu: "જિલ્લાઓ" },
      },
      {
        value: "18+",
        label: { en: "Sports", gu: "રમતો" },
      },
      {
        value: "2024",
        label: { en: "Established", gu: "સ્થાપના" },
      },
    ],
  };

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/sports/stadium-lights.jpg"
          alt="Sports stadium"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/90 dark:bg-primary/95" />
      </div>

      <div className="container relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "text-2xl md:text-3xl font-bold text-white text-center mb-12",
            locale === "gu" && "font-[var(--font-noto-gujarati)] text-xl md:text-2xl"
          )}
        >
          {content.title[locale]}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {content.stats.map((stat, index) => (
            <div key={stat.label.en} className="text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, type: "spring" }}
                className={cn(
                  "text-3xl md:text-4xl lg:text-5xl font-bold text-[#f59e0b]",
                  locale === "gu" && "font-[var(--font-noto-gujarati)] text-2xl md:text-3xl lg:text-4xl"
                )}
              >
                {stat.value}
              </motion.div>
              <div className={cn(
                "mt-2 text-white/80 text-sm md:text-base",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {stat.label[locale]}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";

import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

const sports = [
  { en: "Athletics", gu: "એથ્લેટિક્સ" },
  { en: "Badminton", gu: "બેડમિન્ટન" },
  { en: "Basketball", gu: "બાસ્કેટબોલ" },
  { en: "Boxing", gu: "બોક્સિંગ" },
  { en: "Cricket", gu: "ક્રિકેટ" },
  { en: "Cycling", gu: "સાઇકલિંગ" },
  { en: "Fencing", gu: "ફેન્સિંગ" },
  { en: "Football", gu: "ફૂટબોલ" },
  { en: "Gymnastics", gu: "જિમ્નાસ્ટિક્સ" },
  { en: "Hockey", gu: "હોકી" },
  { en: "Kabaddi", gu: "કબડ્ડી" },
  { en: "Kho-Kho", gu: "ખો-ખો" },
  { en: "Swimming", gu: "તરણ" },
  { en: "Table Tennis", gu: "ટેબલ ટેનિસ" },
  { en: "Tennis", gu: "ટેનિસ" },
  { en: "Volleyball", gu: "વોલીબોલ" },
  { en: "Wrestling", gu: "કુસ્તી" },
  { en: "Yoga", gu: "યોગ" },
];

export function SportsSection() {
  const { locale } = useLanguage();

  const content = {
    eyebrow: { en: "Sports Disciplines", gu: "રમતગમત શાખાઓ" },
    title: {
      en: "Coaches Across Every Discipline",
      gu: "દરેક શાખામાં કોચ",
    },
    description: {
      en: "Gujarat's coaches train athletes across a wide range of sports disciplines, from traditional games to Olympic sports.",
      gu: "ગુજરાતના કોચ પરંપરાગત રમતોથી ઓલિમ્પિક રમતો સુધી રમતગમત શાખાઓની વિશાળ શ્રેણીમાં ખેલાડીઓને તાલીમ આપે છે.",
    },
  };

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-[#f59e0b] text-sm font-semibold uppercase tracking-wider">
            {content.eyebrow[locale]}
          </span>
          <h2 className={cn(
            "mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
            locale === "gu" && "font-[var(--font-noto-gujarati)] text-2xl sm:text-3xl"
          )}>
            {content.title[locale]}
          </h2>
          <p className={cn(
            "mt-4 text-muted-foreground",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {content.description[locale]}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {sports.map((sport, index) => (
            <motion.div
              key={sport.en}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className={cn(
                "px-5 py-2.5 rounded-full border bg-card text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-default",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}
            >
              {sport[locale]}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

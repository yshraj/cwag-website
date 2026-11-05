"use client";

import { MapPin } from "lucide-react";
import { motion } from "motion/react";

import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

// Gujarat districts - factual geographic data only (34 districts as of Oct 2025)
const districts = [
  { name: "Ahmedabad", nameGu: "અમદાવાદ" },
  { name: "Amreli", nameGu: "અમરેલી" },
  { name: "Anand", nameGu: "આણંદ" },
  { name: "Aravalli", nameGu: "અરવલ્લી" },
  { name: "Banaskantha", nameGu: "બનાસકાંઠા" },
  { name: "Bharuch", nameGu: "ભરૂચ" },
  { name: "Bhavnagar", nameGu: "ભાવનગર" },
  { name: "Botad", nameGu: "બોટાદ" },
  { name: "Chhota Udaipur", nameGu: "છોટા ઉદેપુર" },
  { name: "Dahod", nameGu: "દાહોદ" },
  { name: "Dang", nameGu: "ડાંગ" },
  { name: "Devbhoomi Dwarka", nameGu: "દેવભૂમિ દ્વારકા" },
  { name: "Gandhinagar", nameGu: "ગાંધીનગર" },
  { name: "Gir Somnath", nameGu: "ગીર સોમનાથ" },
  { name: "Jamnagar", nameGu: "જામનગર" },
  { name: "Junagadh", nameGu: "જૂનાગઢ" },
  { name: "Kheda", nameGu: "ખેડા" },
  { name: "Kutch", nameGu: "કચ્છ" },
  { name: "Mahisagar", nameGu: "મહીસાગર" },
  { name: "Mehsana", nameGu: "મહેસાણા" },
  { name: "Morbi", nameGu: "મોરબી" },
  { name: "Narmada", nameGu: "નર્મદા" },
  { name: "Navsari", nameGu: "નવસારી" },
  { name: "Panchmahal", nameGu: "પંચમહાલ" },
  { name: "Patan", nameGu: "પાટણ" },
  { name: "Porbandar", nameGu: "પોરબંદર" },
  { name: "Rajkot", nameGu: "રાજકોટ" },
  { name: "Sabarkantha", nameGu: "સાબરકાંઠા" },
  { name: "Surat", nameGu: "સુરત" },
  { name: "Surendranagar", nameGu: "સુરેન્દ્રનગર" },
  { name: "Tapi", nameGu: "તાપી" },
  { name: "Vadodara", nameGu: "વડોદરા" },
  { name: "Valsad", nameGu: "વલસાડ" },
  { name: "Vav-Tharad", nameGu: "વાવ-થરાદ" },
];

export function DistrictsSection() {
  const { t, locale } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-orange-50/20 dark:from-primary/10 dark:to-background py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            {locale === "gu" ? "રાજ્યવ્યાપી" : "Statewide"}
          </span>
          <h2 className={cn(
            "mt-3 text-3xl font-bold tracking-tight sm:text-4xl",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {t("districts.title")}
          </h2>
          <p className={cn(
            "text-muted-foreground mt-4 text-lg",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {t("districts.subtitle")}
          </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <div className="rounded-2xl border bg-primary p-8 text-primary-foreground text-center">
            <MapPin className="mx-auto mb-4 h-10 w-10" />
            <div className="text-5xl font-bold">34</div>
            <div className={cn(
              "mt-2 text-primary-foreground/80",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("districts.count")}
            </div>
          </div>
        </motion.div>

        {/* Districts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border bg-card p-6"
        >
          <h3 className={cn(
            "mb-6 text-lg font-semibold text-center",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {locale === "gu" ? "ગુજરાતના જિલ્લાઓ" : "Districts of Gujarat"}
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
            {districts.map((district, index) => (
              <motion.div
                key={district.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.015 }}
                className="rounded-lg border bg-muted/30 px-3 py-2 text-center text-sm"
              >
                <span className={cn(
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? district.nameGu : district.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

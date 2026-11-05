"use client";

import { useState, useMemo } from "react";

import { Search, MapPin, Medal, Briefcase, User } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

// Sample coach data - PLACEHOLDER/DEMO DATA
const coachesData = [
  {
    id: 1,
    name: "Rahul Sharma",
    nameGu: "રાહુલ શર્મા",
    sport: "Cricket",
    sportGu: "ક્રિકેટ",
    district: "Ahmedabad",
    districtGu: "અમદાવાદ",
    experience: 15,
    qualification: "Level 3 BCCI Certified",
    qualificationGu: "લેવલ 3 BCCI પ્રમાણિત",
  },
  {
    id: 2,
    name: "Priya Patel",
    nameGu: "પ્રિયા પટેલ",
    sport: "Badminton",
    sportGu: "બેડમિન્ટન",
    district: "Surat",
    districtGu: "સુરત",
    experience: 10,
    qualification: "BAI Certified Coach",
    qualificationGu: "BAI પ્રમાણિત કોચ",
  },
  {
    id: 3,
    name: "Amit Desai",
    nameGu: "અમિત દેસાઈ",
    sport: "Football",
    sportGu: "ફૂટબોલ",
    district: "Vadodara",
    districtGu: "વડોદરા",
    experience: 12,
    qualification: "AFC C License",
    qualificationGu: "AFC C લાઇસન્સ",
  },
  {
    id: 4,
    name: "Meera Shah",
    nameGu: "મીરા શાહ",
    sport: "Athletics",
    sportGu: "એથ્લેટિક્સ",
    district: "Rajkot",
    districtGu: "રાજકોટ",
    experience: 8,
    qualification: "NIS Diploma",
    qualificationGu: "NIS ડિપ્લોમા",
  },
  {
    id: 5,
    name: "Vikram Singh",
    nameGu: "વિક્રમ સિંહ",
    sport: "Kabaddi",
    sportGu: "કબડ્ડી",
    district: "Gandhinagar",
    districtGu: "ગાંધીનગર",
    experience: 20,
    qualification: "SAI Level 2",
    qualificationGu: "SAI લેવલ 2",
  },
  {
    id: 6,
    name: "Nisha Joshi",
    nameGu: "નિશા જોશી",
    sport: "Swimming",
    sportGu: "તરણ",
    district: "Bhavnagar",
    districtGu: "ભાવનગર",
    experience: 14,
    qualification: "SFI Coach Certificate",
    qualificationGu: "SFI કોચ સર્ટિફિકેટ",
  },
  {
    id: 7,
    name: "Kiran Modi",
    nameGu: "કિરણ મોદી",
    sport: "Table Tennis",
    sportGu: "ટેબલ ટેનિસ",
    district: "Jamnagar",
    districtGu: "જામનગર",
    experience: 11,
    qualification: "ITTF Level 1",
    qualificationGu: "ITTF લેવલ 1",
  },
  {
    id: 8,
    name: "Ravi Thakkar",
    nameGu: "રવિ ઠક્કર",
    sport: "Wrestling",
    sportGu: "કુસ્તી",
    district: "Junagadh",
    districtGu: "જૂનાગઢ",
    experience: 18,
    qualification: "SAI Advanced",
    qualificationGu: "SAI અદ્યતન",
  },
];

const sports = [
  "All", "Cricket", "Badminton", "Football", "Athletics", 
  "Kabaddi", "Swimming", "Table Tennis", "Wrestling", "Hockey",
  "Volleyball", "Basketball", "Tennis", "Boxing", "Gymnastics"
];

const districts = [
  "All", "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar",
  "Bhavnagar", "Jamnagar", "Junagadh", "Kutch", "Mehsana", "Anand",
  "Kheda", "Patan", "Banaskantha", "Bharuch", "Navsari"
];

export function DirectoryPageContent() {
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const filteredCoaches = useMemo(() => {
    return coachesData.filter((coach) => {
      const matchesSearch = 
        coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.nameGu.includes(searchQuery) ||
        coach.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.district.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSport = selectedSport === "All" || coach.sport === selectedSport;
      const matchesDistrict = selectedDistrict === "All" || coach.district === selectedDistrict;

      return matchesSearch && matchesSport && matchesDistrict;
    });
  }, [searchQuery, selectedSport, selectedDistrict]);

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-orange-50/20 py-12 lg:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("directory.title")}
            </h1>
            <p className={cn(
              "text-muted-foreground mt-4 text-lg",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("directory.subtitle")}
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-8 max-w-4xl"
          >
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t("directory.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-10"
                />
              </div>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="h-12 rounded-md border bg-background px-4"
              >
                {sports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport === "All" ? t("directory.filters.all") + " " + t("directory.filters.sport") : sport}
                  </option>
                ))}
              </select>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="h-12 rounded-md border bg-background px-4"
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district === "All" ? t("directory.filters.all") + " " + t("directory.filters.district") : district}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coach Listings */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <p className={cn(
              "text-muted-foreground text-sm",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {locale === "gu" 
                ? `${filteredCoaches.length} કોચ મળ્યા` 
                : `${filteredCoaches.length} coaches found`}
            </p>
          </div>

          {filteredCoaches.length === 0 ? (
            <div className="rounded-2xl border bg-muted/30 py-16 text-center">
              <User className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className={cn(
                "mt-4 text-muted-foreground",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {t("directory.noResults")}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCoaches.map((coach, index) => (
                <motion.div
                  key={coach.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-lg"
                >
                  {/* Avatar */}
                  <div className="bg-gradient-to-br from-primary/20 to-orange-500/20 p-6 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-background">
                      <User className="h-10 w-10 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className={cn(
                      "text-lg font-semibold",
                      locale === "gu" && "font-[var(--font-noto-gujarati)]"
                    )}>
                      {locale === "gu" ? coach.nameGu : coach.name}
                    </h3>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Medal className="h-4 w-4 text-primary" />
                        <span className={cn(locale === "gu" && "font-[var(--font-noto-gujarati)]")}>
                          {locale === "gu" ? coach.sportGu : coach.sport}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className={cn(locale === "gu" && "font-[var(--font-noto-gujarati)]")}>
                          {locale === "gu" ? coach.districtGu : coach.district}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span>
                          {coach.experience} {t("common.years")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-muted/50 p-3">
                      <p className={cn(
                        "text-xs text-muted-foreground",
                        locale === "gu" && "font-[var(--font-noto-gujarati)]"
                      )}>
                        {t("directory.profile.qualification")}
                      </p>
                      <p className={cn(
                        "text-sm font-medium",
                        locale === "gu" && "font-[var(--font-noto-gujarati)]"
                      )}>
                        {locale === "gu" ? coach.qualificationGu : coach.qualification}
                      </p>
                    </div>

                    <Button className="mt-4 w-full" variant="outline" size="sm">
                      {t("directory.profile.viewProfile")}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <p className={cn(
            "text-muted-foreground mt-8 text-center text-xs",
            locale === "gu" && "font-[var(--font-noto-gujarati)]"
          )}>
            {locale === "gu" 
              ? "* ડેમો ડેટા - વાસ્તવિક કોચ પ્રોફાઇલ્સ સાથે અપડેટ કરવામાં આવશે" 
              : "* Demo data - will be updated with actual coach profiles"}
          </p>
        </div>
      </section>
    </div>
  );
}

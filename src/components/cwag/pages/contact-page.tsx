"use client";

import { useState } from "react";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function ContactPageContent() {
  const { t, locale } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t("contact.info.address"),
      value: "Gandhinagar, Gujarat\nIndia - 382010",
      valueGu: "ગાંધીનગર, ગુજરાત\nભારત - 382010",
      isPlaceholder: false,
    },
    {
      icon: Phone,
      label: t("contact.info.phone"),
      value: "Coming soon",
      valueGu: "ટૂંક સમયમાં",
      isPlaceholder: true,
    },
    {
      icon: Mail,
      label: t("contact.info.email"),
      value: "contact@cwag.org",
      valueGu: "contact@cwag.org",
      isPlaceholder: false,
    },
    {
      icon: Clock,
      label: t("contact.info.hours"),
      value: "Monday - Saturday\n10:00 AM - 6:00 PM",
      valueGu: "સોમવાર - શનિવાર\nસવારે 10:00 - સાંજે 6:00",
      isPlaceholder: false,
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/cwa.gujarat/",
      icon: Instagram,
    },
    { name: "Facebook", url: "#", icon: Facebook },
    { name: "Twitter", url: "#", icon: Twitter },
  ];

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-orange-50/20 py-12 lg:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("contact.title")}
            </h1>
            <p className={cn(
              "text-muted-foreground mt-4 text-lg",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("contact.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {isSubmitted ? (
                <div className="rounded-2xl border bg-card p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className={cn(
                    "text-xl font-semibold",
                    locale === "gu" && "font-[var(--font-noto-gujarati)]"
                  )}>
                    {locale === "gu" ? "સંદેશ મોકલવામાં આવ્યો!" : "Message Sent!"}
                  </h2>
                  <p className={cn(
                    "text-muted-foreground mt-2",
                    locale === "gu" && "font-[var(--font-noto-gujarati)]"
                  )}>
                    {locale === "gu"
                      ? "આભાર! અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું."
                      : "Thank you! We'll get back to you soon."}
                  </p>
                  <p className={cn(
                    "text-muted-foreground mt-4 text-xs",
                    locale === "gu" && "font-[var(--font-noto-gujarati)]"
                  )}>
                    {locale === "gu"
                      ? "* આ ફ્રન્ટએન્ડ પ્રોટોટાઇપ છે"
                      : "* This is a frontend prototype"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-6 lg:p-8">
                  <h2 className={cn(
                    "mb-6 text-xl font-semibold",
                    locale === "gu" && "font-[var(--font-noto-gujarati)]"
                  )}>
                    {locale === "gu" ? "સંદેશ મોકલો" : "Send us a message"}
                  </h2>

                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.form.name")} *</Label>
                        <Input id="name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.form.email")} *</Label>
                        <Input id="email" type="email" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                      <Input id="phone" type="tel" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("contact.form.subject")} *</Label>
                      <Input id="subject" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("contact.form.message")} *</Label>
                      <Textarea id="message" rows={5} required />
                    </div>

                    <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                      <Send className="h-4 w-4" />
                      {isSubmitting
                        ? locale === "gu"
                          ? "મોકલી રહ્યા છીએ..."
                          : "Sending..."
                        : t("contact.form.send")}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Info Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border bg-card p-5"
                  >
                    <div className="bg-primary/10 mb-3 inline-flex rounded-lg p-2">
                      <item.icon className="text-primary h-5 w-5" />
                    </div>
                    <h3 className={cn(
                      "font-medium",
                      locale === "gu" && "font-[var(--font-noto-gujarati)]"
                    )}>
                      {item.label}
                    </h3>
                    <p className={cn(
                      "mt-1 whitespace-pre-line text-sm",
                      item.isPlaceholder ? "text-muted-foreground/60 italic" : "text-muted-foreground",
                      locale === "gu" && "font-[var(--font-noto-gujarati)]"
                    )}>
                      {locale === "gu" ? item.valueGu : item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="rounded-xl border bg-card p-6">
                <h3 className={cn(
                  "font-semibold",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {t("contact.social")}
                </h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-muted hover:bg-primary hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-muted/30 p-8 text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className={cn(
                  "font-semibold",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? "ગાંધીનગર, ગુજરાત" : "Gandhinagar, Gujarat"}
                </h3>
                <p className={cn(
                  "text-muted-foreground mt-2 text-sm",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu"
                    ? "ઇન્ટરેક્ટિવ નકશો ટૂંક સમયમાં ઉપલબ્ધ થશે"
                    : "Interactive map coming soon"}
                </p>
              </div>

              <p className={cn(
                "text-muted-foreground text-center text-xs",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {locale === "gu"
                  ? "* સંપર્ક માહિતી સત્તાવાર વિગતો સાથે અપડેટ કરવામાં આવશે"
                  : "* Contact information will be updated with official details"}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

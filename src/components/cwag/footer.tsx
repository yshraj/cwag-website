"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function CWAGFooter() {
  const { locale } = useLanguage();

  const content = {
    cta: {
      title: { en: "Ready to Join?", gu: "જોડાવા તૈયાર છો?" },
      description: {
        en: "Connect with Gujarat's sports coaching community. Express your interest in CWAG membership.",
        gu: "ગુજરાતના રમતગમત કોચિંગ સમુદાય સાથે જોડાઓ. CWAG સભ્યપદમાં તમારો રસ વ્યક્ત કરો.",
      },
      button: { en: "Learn About Membership", gu: "સભ્યપદ વિશે જાણો" },
    },
    quickLinks: { en: "Quick Links", gu: "ઝડપી લિંક્સ" },
    resources: { en: "Resources", gu: "સંસાધનો" },
    contact: { en: "Contact", gu: "સંપર્ક" },
    disclaimer: {
      en: "This website is under development. Some information is pending verification with the association.",
      gu: "આ વેબસાઇટ વિકાસ હેઠળ છે. કેટલીક માહિતી સંગઠન સાથે ચકાસણી માટે બાકી છે.",
    },
    sagNote: {
      en: "CWAG is an independent association, separate from the Sports Authority of Gujarat (SAG).",
      gu: "CWAG એક સ્વતંત્ર સંગઠન છે, રમતગમત સત્તા ગુજરાત (SAG) થી અલગ.",
    },
    copyright: {
      en: "© 2026 Coaches' Welfare Association of Gujarat",
      gu: "© 2026 કોચ વેલ્ફેર એસોસિએશન ગુજરાત",
    },
  };

  const quickLinks = [
    { label: { en: "Home", gu: "હોમ" }, href: "/" },
    { label: { en: "About CWAG", gu: "CWAG વિશે" }, href: "/about" },
    { label: { en: "Our Work", gu: "અમારું કાર્ય" }, href: "/about#our-work" },
    { label: { en: "Membership", gu: "સભ્યપદ" }, href: "/membership" },
    { label: { en: "News", gu: "સમાચાર" }, href: "/news" },
    { label: { en: "Contact", gu: "સંપર્ક" }, href: "/contact" },
  ];

  const resources = [
    { label: "Sports Authority of India", href: "https://sportsauthorityofindia.gov.in", external: true },
    { label: "Khelo India", href: "https://kheloindia.gov.in", external: true },
    { label: "Sports Authority of Gujarat", href: "https://khelmahakumbh.gujarat.gov.in", external: true },
    { label: "Ministry of Youth Affairs & Sports", href: "https://yas.gov.in", external: true },
  ];

  return (
    <footer className="bg-[#0a0f1a] text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="container py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <h2 className={cn(
                "text-3xl font-bold",
                locale === "gu" && "font-[var(--font-noto-gujarati)] text-2xl"
              )}>
                {content.cta.title[locale]}
              </h2>
              <p className={cn(
                "mt-3 text-white/70",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {content.cta.description[locale]}
              </p>
            </div>
            <Button
              size="lg"
              className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0a0f1a] font-semibold gap-2"
              asChild
            >
              <Link href="/membership">
                {content.cta.button[locale]}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg bg-white overflow-hidden">
                <Image
                  src="/logos/cwag-logo.jpeg"
                  alt="CWAG Logo"
                  fill
                  className="object-contain p-0.5"
                  sizes="48px"
                />
              </div>
              <div>
                <div className="text-xl font-bold">CWAG</div>
                <div className={cn(
                  "text-xs text-white/60",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {locale === "gu" ? "ગુજરાત" : "Gujarat"}
                </div>
              </div>
            </Link>
            <p className={cn(
              "mt-6 text-sm text-white/60 leading-relaxed",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {content.disclaimer[locale]}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={cn(
              "font-semibold mb-4",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {content.quickLinks[locale]}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm text-white/60 hover:text-white transition-colors",
                      locale === "gu" && "font-[var(--font-noto-gujarati)]"
                    )}
                  >
                    {link.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={cn(
              "font-semibold mb-4",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {content.resources[locale]}
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={cn(
              "font-semibold mb-4",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {content.contact[locale]}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#f59e0b] mt-1 shrink-0" />
                <span className="text-sm text-white/60">
                  <span className="text-white/40 italic text-xs">
                    {locale === "gu" ? "સરનામું ટૂંક સમયમાં" : "Address coming soon"}
                  </span>
                  <br />
                  Gujarat, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#f59e0b] shrink-0" />
                <span className="text-sm text-white/40 italic">
                  {locale === "gu" ? "ઇમેઇલ ટૂંક સમયમાં" : "Email coming soon"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#f59e0b] shrink-0" />
                <span className="text-sm text-white/40 italic">
                  {locale === "gu" ? "ફોન ટૂંક સમયમાં" : "Phone coming soon"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className={cn(
              "text-sm text-white/40",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {content.copyright[locale]}
            </p>
            <p className={cn(
              "text-xs text-white/30",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {content.sagNote[locale]}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

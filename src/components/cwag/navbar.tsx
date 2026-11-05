"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Globe,
  Menu,
  X,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export const CWAGNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: { en: "Home", gu: "હોમ" }, href: "/" },
    { label: { en: "About", gu: "અમારા વિશે" }, href: "/about" },
    { label: { en: "Our Work", gu: "અમારું કાર્ય" }, href: "/about#our-work" },
    { label: { en: "Membership", gu: "સભ્યપદ" }, href: "/membership" },
    { label: { en: "News", gu: "સમાચાર" }, href: "/news" },
    { label: { en: "Contact", gu: "સંપર્ક" }, href: "/contact" },
  ];

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "gu" : "en");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Logo Image */}
            <div className={cn(
              "relative w-10 h-10 lg:w-11 lg:h-11 rounded-lg overflow-hidden transition-all",
              isScrolled 
                ? "bg-white shadow-sm" 
                : "bg-white/95 backdrop-blur-sm"
            )}>
              <Image
                src="/logos/cwag-logo.jpeg"
                alt="CWAG Logo"
                fill
                className="object-contain p-0.5"
                sizes="(max-width: 1024px) 40px, 44px"
                priority
              />
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className={cn(
                "text-lg lg:text-xl font-bold tracking-tight transition-colors",
                isScrolled ? "text-foreground" : "text-white"
              )}>
                CWAG
              </span>
              <span className={cn(
                "text-[10px] lg:text-xs font-medium -mt-0.5 transition-colors hidden sm:block",
                locale === "gu" && "font-[var(--font-noto-gujarati)]",
                isScrolled ? "text-muted-foreground" : "text-white/70"
              )}>
                {locale === "gu" ? "કોચ વેલ્ફેર એસોસિએશન" : "Coaches Welfare"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]",
                  pathname === item.href
                    ? isScrolled
                      ? "text-primary bg-primary/10"
                      : "text-[#f59e0b] bg-white/10"
                    : isScrolled
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label[locale]}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className={cn(
                "h-9 gap-1.5 text-xs font-medium",
                isScrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">
                {locale === "en" ? "ગુ" : "EN"}
              </span>
            </Button>

            <ThemeToggle variant={isScrolled ? "default" : "hero"} />

            {/* CTA */}
            <Link href="/membership" className="hidden lg:block">
              <Button
                size="sm"
                className={cn(
                  "h-9 font-medium",
                  !isScrolled && "bg-[#f59e0b] hover:bg-[#d97706] text-[#0a0f1a]"
                )}
              >
                {locale === "gu" ? "જોડાઓ" : "Join"}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "lg:hidden flex items-center justify-center h-10 w-10 rounded-lg transition-colors",
                isScrolled
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Full screen overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 z-50"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Solid background that covers everything */}
          <div className="absolute inset-0 bg-background" />
          
          {/* Menu content */}
          <div className="relative container py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    locale === "gu" && "font-[var(--font-noto-gujarati)]",
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label[locale]}
                </Link>
              ))}
            </nav>
            
            <div className="mt-4 pt-4 border-t">
              <Link href="/membership" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">
                  {locale === "gu" ? "સભ્ય બનો" : "Become a Member"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

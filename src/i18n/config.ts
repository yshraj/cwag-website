export const locales = ["en", "gu"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  gu: "ગુજરાતી",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  gu: "🇮🇳",
};

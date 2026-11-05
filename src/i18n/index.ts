import en from "./locales/en.json";
import gu from "./locales/gu.json";

export const dictionaries = {
  en,
  gu,
} as const;

export type Dictionary = typeof en;

export function getDictionary(locale: string): Dictionary {
  if (locale === "gu") return gu as Dictionary;
  return en;
}

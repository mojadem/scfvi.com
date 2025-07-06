import { getAllTranslations } from "./api";

const defaultLocale = "en";

export type SupportedLocale = "en" | "ar";
export const supportedLocales: SupportedLocale[] = ["en", "ar"];

const translations = await getAllTranslations();

export function useTranslations(locale: SupportedLocale) {
  return function i18n(text: string) {
    const translationEntry = translations.find(
      (t) => t[defaultLocale] === text,
    );

    if (translationEntry === undefined) {
      return text;
    }

    return translationEntry[locale] || translationEntry[defaultLocale];
  };
}

export function removeLocaleFromUrl(url: string) {
  return url
    .split("/")
    .filter((p) => !supportedLocales.includes(p as SupportedLocale))
    .join("/");
}

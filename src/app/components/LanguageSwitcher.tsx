"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Locale } from "../../i18n";

export const LanguageSwitcher = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    const newLocale: Locale = locale === "zh" ? "en" : "zh";
    
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  return (
    <button
      onClick={switchLanguage}
      className="whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 md:px-3"
      aria-label="Change language"
    >
      {locale === "en" ? "中文" : "English"}
    </button>
  );
};

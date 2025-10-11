"use client";
import { ReactNode } from "react";
import {
  DocumentMagnifyingGlassIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  LockClosedIcon,
  ArrowDownTrayIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { FadeIn } from "components/animations/FadeIn";
import { StaggeredFadeIn } from "components/animations/StaggeredFadeIn";
import { useTranslations } from "next-intl";

interface Feature {
  icon: ReactNode;
  titleKey: string;
  descriptionKey: string;
}

const featuresList: Feature[] = [
  {
    icon: <DocumentMagnifyingGlassIcon className="h-8 w-8 text-sky-700" />,
    titleKey: "parser.title",
    descriptionKey: "parser.description",
  },
  {
    icon: <PaintBrushIcon className="h-8 w-8 text-sky-700" />,
    titleKey: "templates.title",
    descriptionKey: "templates.description",
  },
  {
    icon: <DevicePhoneMobileIcon className="h-8 w-8 text-sky-700" />,
    titleKey: "responsive.title",
    descriptionKey: "responsive.description",
  },
  {
    icon: <LockClosedIcon className="h-8 w-8 text-sky-700" />,
    titleKey: "security.title",
    descriptionKey: "security.description",
  },
  {
    icon: <ArrowDownTrayIcon className="h-8 w-8 text-sky-700" />,
    titleKey: "export.title",
    descriptionKey: "export.description",
  },
  {
    icon: <CheckBadgeIcon className="h-8 w-8 text-sky-700" />,
    titleKey: "ats.title",
    descriptionKey: "ats.description",
  },
];

export const Features = () => {
  const t = useTranslations("home.features");
  return (
    <section className="mx-auto mt-12 max-w-6xl px-4 pb-12 sm:mt-16 sm:px-8 sm:pb-16">
      <FadeIn direction="up">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-gray-600 sm:mt-4 sm:text-lg">
          {t("subtitle")}
        </p>
      </FadeIn>{" "}
      <StaggeredFadeIn
        as="div"
        className="mt-10 grid auto-rows-fr grid-cols-1 gap-x-6 gap-y-8 sm:mt-14 sm:gap-x-8 sm:gap-y-10 md:grid-cols-2 lg:grid-cols-3"
        staggerDelay={100}
      >
        {featuresList.map(({ icon, titleKey, descriptionKey }, idx) => (
          <div
            key={idx}
            className="group relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 transition-colors group-hover:bg-sky-100 sm:h-12 sm:w-12">
                {icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                {t(titleKey as any)}
              </h3>
            </div>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600 sm:mt-3 sm:text-base">
              {t(descriptionKey as any)}
            </p>
          </div>
        ))}
      </StaggeredFadeIn>
    </section>
  );
};

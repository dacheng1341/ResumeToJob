"use client";
import { useState } from "react";
import { FadeIn } from "components/animations/FadeIn";
import { StaggeredFadeIn } from "components/animations/StaggeredFadeIn";
import { useTranslations } from "next-intl";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const t = useTranslations("home.faq");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqItems = [
    {
      question: t("items.garbledText.question"),
      answer: t("items.garbledText.answer"),
    },
    {
      question: t("items.chineseFonts.question"),
      answer: t("items.chineseFonts.answer"),
    },
  ];
  return (
    <section className="mx-auto mt-12 max-w-3xl px-4 pb-16 sm:mt-16 sm:px-8 sm:pb-20">
      <FadeIn direction="up">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-gray-600 sm:mt-4 sm:text-lg">
          {t("subtitle")}
        </p>
      </FadeIn>

      <StaggeredFadeIn
        as="div"
        className="mt-8 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white sm:mt-10"
        staggerDelay={50}
      >
        {faqItems.map((item, idx) => (
          <div key={idx} className="px-3 sm:px-4">
            <button
              className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-gray-900 focus:outline-none sm:py-5 sm:text-lg"
              onClick={() => toggleFAQ(idx)}
            >
              <span className="pr-4">{item.question}</span>
              <span className="ml-4 flex-shrink-0 sm:ml-6">
                {openIndex === idx ? (
                  <MinusIcon className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5" />
                ) : (
                  <PlusIcon className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5" />
                )}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === idx ? "max-h-96 pb-4 sm:pb-5" : "max-h-0"
              }`}
            >
              <p className="text-sm text-gray-600 sm:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </StaggeredFadeIn>
    </section>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

const MinusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 12H4"
    />
  </svg>
);

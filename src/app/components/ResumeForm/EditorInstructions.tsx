"use client";
import React, { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

export const EditorInstructions = () => {
  const t = useTranslations("editorInstructions");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 rounded-md bg-blue-50 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-medium text-blue-800">
          <InformationCircleIcon className="h-6 w-6 text-blue-600" />
          {t("title")}
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 underline hover:text-blue-800"
        >
          {isExpanded ? t("hideInstructions") : t("showInstructions")}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3">
          <h4 className="mb-2 font-medium text-blue-700">{t("markdown")}</h4>
          <ul className="list-disc space-y-2 pl-5 text-blue-700">
            <li>{t("unorderedList")}</li>
            <li>{t("orderedList")}</li>
            <li>{t("boldText")}</li>
            <li>{t("autoList")}</li>
            <li>
              {t("hyperlink")}
              <ul className="list-circle mt-1 space-y-1 pl-5">
                <li>{t("hyperlinkMethod1")}</li>
                <li>{t("hyperlinkMethod2")}</li>
              </ul>
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">{t("hint")}</p>

          <div className="mt-4 border-t border-blue-200 pt-3">
            <h4 className="mb-2 font-medium text-blue-700">
              {t("resumeManagement")}
            </h4>
            <p className="text-sm text-blue-700">{t("resumeManagementDesc")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

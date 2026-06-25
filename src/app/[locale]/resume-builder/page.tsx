"use client";
import { useState } from "react";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";
import { useResumeSync } from "../../lib/hooks/useResumeSync";
import { useTranslations } from "next-intl";

export const runtime = 'edge';

export default function Create() {
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const t = useTranslations("resumeBuilder");

  useResumeSync();

  return (
    <main className="relative h-full w-full overflow-hidden bg-gray-50">
      {/* 手机端 Tab 切换 */}
      <div className="md:hidden">
        <div className="flex border-b border-gray-200 bg-white">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 px-4 py-3 text-center font-medium transition-colors ${
              activeTab === "form"
                ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("edit")}
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 px-4 py-3 text-center font-medium transition-colors ${
              activeTab === "preview"
                ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("preview")}
          </button>
        </div>

        {/* Tab 内容 */}
        <div className="h-[calc(100vh-theme(spacing.14))]">
          {activeTab === "form" ? (
            <div className="h-full overflow-y-auto bg-gray-50 p-4">
              <ResumeForm />
            </div>
          ) : (
            <div className="h-full overflow-hidden bg-gray-100">
              <Resume />
            </div>
          )}
        </div>
      </div>

      {/* 桌面端 */}
      <div className="hidden h-screen md:flex">
        {/* 左侧表单 */}
        <div className="flex h-full w-full flex-col overflow-hidden md:w-1/2">
          <div className="flex-1 overflow-y-auto p-6">
            <ResumeForm />
          </div>
        </div>

        {/* 右侧预览 */}
        <div className="hidden h-full md:flex md:w-1/2 md:flex-col">
          <Resume />
        </div>
      </div>
    </main>
  );
}

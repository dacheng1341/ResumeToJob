"use client";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllResumes, importResumes } from "lib/redux/resumeManagerSlice";
import type { AppDispatch } from "lib/redux/store";
import type { ResumeData } from "lib/redux/types";
import { useTranslations } from "next-intl";

export const ResumeImportExport: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("resumeManager");
  const allResumes = useSelector(selectAllResumes);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportAll = () => {
    if (allResumes.length === 0) {
      alert(t("noResumesToExport"));
      return;
    }

    const exportData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      resumes: allResumes,
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `resumetojob_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert(t("exportSuccess"));
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        if (data.resumes && Array.isArray(data.resumes)) {
          if (data.version && data.version !== "1.0") {
            console.warn(`导入数据版本 ${data.version} 可能不兼容当前版本 1.0`);
          }

          const validResumes: ResumeData[] = data.resumes.filter(
            (resume: any) => resume.metadata && resume.content,
          );

          if (validResumes.length > 0) {
            dispatch(importResumes(validResumes));
            alert(
              `${t("importSuccess")} 导入了 ${validResumes.length} 份简历。`,
            );
          } else {
            throw new Error("No valid resumes found");
          }
        } else {
          throw new Error("Invalid format");
        }
      } catch (error) {
        console.error("Import error:", error);
        alert(t("importError"));
      }
    };

    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExportAll}
        className="rounded-lg border border-green-600 bg-white px-4 py-2 text-sm text-green-700 transition-colors hover:bg-green-50 disabled:opacity-50"
        title={t("exportAll")}
        disabled={allResumes.length === 0}
      >
        {t("exportAll")}
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="rounded-lg border border-blue-600 bg-white px-4 py-2 text-sm text-blue-700 transition-colors hover:bg-blue-50"
        title={t("importResumes")}
      >
        {t("importResumes")}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
};

"use client";
import React, { useState } from "react";
import { FolderIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentResume,
  selectAllResumes,
  switchResume,
} from "lib/redux/resumeManagerSlice";
import { ResumeManager } from "./index";
import { useTranslations } from "next-intl";

export const ResumeManagerButton: React.FC = () => {
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const t = useTranslations("resumeManager");
  const dispatch = useDispatch();

  const currentResume = useSelector(selectCurrentResume);
  const allResumes = useSelector(selectAllResumes);

  const handleSwitchResume = (resumeId: string) => {
    dispatch(switchResume(resumeId));
  };

  return (
    <div className="mb-6 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderIcon className="h-7 w-7 text-blue-600" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {t("manageResumes")}
            </h3>
            <p className="text-sm text-gray-600">
              {t("current")}:{" "}
              {currentResume?.metadata.title || t("notSelected")} (
              {allResumes.length} {t("resumesCount")})
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsManagerOpen(true)}
          className="rounded-lg border border-gray-800 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
        >
          {t("manageButton")}
        </button>
      </div>

      {/* 快捷操作区域 */}
      {allResumes.length > 1 && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
            {t("quickSwitch")}
          </p>
          <div className="flex flex-wrap gap-2">
            {allResumes.slice(0, 4).map((resume) => (
              <button
                key={resume.metadata.id}
                onClick={() => handleSwitchResume(resume.metadata.id)}
                className={`rounded-md px-3 py-1 text-xs transition-colors ${
                  resume.metadata.id === currentResume?.metadata.id
                    ? "border border-blue-600 bg-blue-50 text-blue-800"
                    : "border border-gray-800 bg-white text-gray-800 hover:bg-gray-50"
                }`}
                title={resume.metadata.description || resume.metadata.title}
              >
                {resume.metadata.title}
              </button>
            ))}
            {allResumes.length > 4 && (
              <button
                onClick={() => setIsManagerOpen(true)}
                className="rounded-md border border-gray-800 bg-white px-3 py-1 text-xs text-gray-800 hover:bg-gray-50"
              >
                +{allResumes.length - 4} {t("more")}
              </button>
            )}
          </div>
        </div>
      )}

      <ResumeManager
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
      />
    </div>
  );
};

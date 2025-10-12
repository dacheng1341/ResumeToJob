"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllResumes,
  selectCurrentResumeId,
  createResume,
  cloneResume,
  deleteResume,
  switchResume,
  updateResumeMetadata,
} from "lib/redux/resumeManagerSlice";
import type { AppDispatch } from "lib/redux/store";
import { Button } from "../Button";
import { useTranslations } from "next-intl";
import { ResumeImportExport } from "./ResumeImportExport";
import { ConfirmModal } from "../ConfirmModal";

interface ResumeManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeManager: React.FC<ResumeManagerProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("resumeManager");

  const resumes = useSelector(selectAllResumes);
  const currentResumeId = useSelector(selectCurrentResumeId);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState("");
  const [editingResume, setEditingResume] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    resumeId: string | null;
    resumeTitle: string;
  }>({
    isOpen: false,
    resumeId: null,
    resumeTitle: "",
  });

  const handleCreateResume = () => {
    if (newResumeTitle.trim()) {
      dispatch(
        createResume({
          title: newResumeTitle.trim(),
        }),
      );
      setNewResumeTitle("");
      setShowCreateForm(false);
    }
  };

  const handleCloneResume = (resumeId: string, originalTitle: string) => {
    const cloneTitle = `${originalTitle} - clone`;
    dispatch(cloneResume({ resumeId, title: cloneTitle }));
  };

  const handleDeleteResume = (resumeId: string, resumeTitle: string) => {
    setDeleteConfirm({
      isOpen: true,
      resumeId,
      resumeTitle,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm.resumeId) {
      dispatch(deleteResume(deleteConfirm.resumeId));
    }
    setDeleteConfirm({
      isOpen: false,
      resumeId: null,
      resumeTitle: "",
    });
  };

  const handleCancelDelete = () => {
    setDeleteConfirm({
      isOpen: false,
      resumeId: null,
      resumeTitle: "",
    });
  };

  const handleSwitchResume = (resumeId: string) => {
    const resumeData = resumes.find((r) => r.metadata.id === resumeId);
    if (resumeData) {
      dispatch(switchResume(resumeId));
      onClose();
    }
  };

  const handleSaveEdit = (resumeId: string) => {
    if (editTitle.trim()) {
      dispatch(
        updateResumeMetadata({
          id: resumeId,
          metadata: { title: editTitle.trim() },
        }),
      );
      setEditingResume(null);
      setEditTitle("");
    }
  };

  const filteredResumes = resumes.filter((resume) => {
    const matchesSearch =
      resume.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resume.metadata.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-gray-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="max-h-[calc(90vh-140px)] overflow-y-auto p-6">
          <div>
            {/* Controls */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={t("search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <ResumeImportExport />
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="whitespace-nowrap rounded-lg border border-gray-800 bg-white px-4 py-2 text-gray-800 transition-colors hover:bg-gray-50"
                >
                  {t("createNew")}
                </Button>
              </div>
            </div>

            {/* Create Form */}
            {showCreateForm && (
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h3 className="mb-4 text-lg font-semibold">{t("createNew")}</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      {t("resumeTitle")}
                    </label>
                    <input
                      type="text"
                      value={newResumeTitle}
                      onChange={(e) => setNewResumeTitle(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder={t("resumeTitle")}
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={handleCreateResume}
                    disabled={!newResumeTitle.trim()}
                    className="rounded-lg border border-gray-800 bg-white px-4 py-2 text-gray-800 transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    {t("create")}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewResumeTitle("");
                    }}
                    className="rounded-lg border border-gray-400 bg-white px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    {t("cancel")}
                  </Button>
                </div>
              </div>
            )}

            {/* Resume List */}
            {filteredResumes.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mb-4 text-6xl text-gray-400">📄</div>
                <p className="text-lg text-gray-500">{t("noResumes")}</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredResumes.map((resume) => (
                  <div
                    key={resume.metadata.id}
                    className={`rounded-lg border p-4 transition-all ${
                      resume.metadata.id === currentResumeId
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {editingResume === resume.metadata.id ? (
                          <div className="mb-2 flex gap-2">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="flex-1 rounded border border-gray-300 px-3 py-1 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => handleSaveEdit(resume.metadata.id)}
                              className="rounded border border-gray-800 bg-white px-3 py-1 text-gray-800 transition-colors hover:bg-gray-50"
                            >
                              {t("save")}
                            </button>
                            <button
                              onClick={() => {
                                setEditingResume(null);
                                setEditTitle("");
                              }}
                              className="rounded border border-gray-400 bg-white px-3 py-1 text-gray-600 transition-colors hover:bg-gray-50"
                            >
                              {t("cancel")}
                            </button>
                          </div>
                        ) : (
                          <div className="mb-2 flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {resume.metadata.title}
                            </h3>
                            {resume.metadata.id === currentResumeId && (
                              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                {t("current")}
                              </span>
                            )}
                          </div>
                        )}
                        {resume.metadata.description && (
                          <p className="mb-2 text-gray-600">
                            {resume.metadata.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>
                            📅 {t("createdAt")}:{" "}
                            {formatDate(resume.metadata.createdAt)}
                          </span>
                          <span>
                            🔄 {t("updatedAt")}:{" "}
                            {formatDate(resume.metadata.updatedAt)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex gap-2">
                        {resume.metadata.id !== currentResumeId && (
                          <Button
                            onClick={() =>
                              handleSwitchResume(resume.metadata.id)
                            }
                            className="rounded border border-gray-800 bg-white px-3 py-1 text-sm text-gray-800 transition-colors hover:bg-gray-50"
                          >
                            {t("switch")}
                          </Button>
                        )}
                        <button
                          onClick={() => {
                            setEditingResume(resume.metadata.id);
                            setEditTitle(resume.metadata.title);
                          }}
                          className="rounded border border-gray-400 bg-white px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() =>
                            handleCloneResume(
                              resume.metadata.id,
                              resume.metadata.title,
                            )
                          }
                          className="rounded border border-gray-400 bg-white px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                        >
                          {t("clone")}
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteResume(
                              resume.metadata.id,
                              resume.metadata.title,
                            )
                          }
                          className="rounded px-3 py-1 text-sm text-red-600 transition-colors hover:bg-red-50"
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title={t("confirmDeleteTitle")}
        message={t("confirmDeleteMessage").replace(
          "{title}",
          deleteConfirm.resumeTitle,
        )}
        confirmText={t("delete")}
        cancelText={t("cancel")}
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
      />
    </div>
  );
};

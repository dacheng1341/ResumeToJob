"use client";
import { usePathname } from "next/navigation";
import { Link } from "../../navigation";
import { useState } from "react";
import logoSrc from "public/logo-500.png";
import { cx } from "lib/cx";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DismissibleBanner } from "./DismissibleBanner";
import { clearLocalStorage } from "../lib/redux/local-storage";
import { ConfirmModal } from "./ConfirmModal";
import { useTranslations } from "next-intl";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage =
    pathName === "/" || pathName === "/zh" || pathName === "/en";
  const t = useTranslations("nav");
  const tModal = useTranslations("modal");
  const tCommon = useTranslations("common");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bugReportModalOpen, setBugReportModalOpen] = useState(false);
  const [resetDefaultModalOpen, setResetDefaultModalOpen] = useState(false);

  // 处理FAQ滚动
  const handleFAQClick = () => {
    // 如果不在首页,先跳转到首页
    if (!isHomePage) {
      window.location.href = "/#faq";
    } else {
      const faqElement = document.getElementById("faq");
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    closeMenu();
  };

  // 处理bug反馈点击
  const handleBugReportClick = () => {
    setBugReportModalOpen(true);
  };

  // 确认bug反馈
  const handleBugReportConfirm = () => {
    setBugReportModalOpen(false);
    window.open("https://github.com/ltlylfun/ResumeToJob/issues", "_blank");
  };

  // 处理恢复默认点击
  const handleResetDefaultClick = () => {
    setResetDefaultModalOpen(true);
  };

  // 确认恢复默认
  const handleResetDefaultConfirm = () => {
    setResetDefaultModalOpen(false);
    try {
      clearLocalStorage();
      console.info("用户手动重置应用状态");
    } catch (error) {
      console.error("重置应用状态失败:", error);
      // 如果清除失败，回退到清除整个 localStorage
      localStorage.clear();
    }
    window.location.reload();
  };

  // 关闭移动端菜单
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <DismissibleBanner />
      <header
        aria-label="Site Header"
        className={cx(
          "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
          isHomePage && "bg-dot",
        )}
      >
        <div className="flex h-10 w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="sr-only">闪电简历</span>
            <img src={logoSrc.src} alt="Logo" className="h-8 w-auto" />
            <span className="text-lg font-semibold text-gray-800">
              闪电简历
            </span>
          </Link>

          {/* 桌面导航 */}
          <nav
            aria-label="Site Nav Bar"
            className="hidden items-center gap-2 text-sm font-medium md:flex"
          >
            <button
              onClick={handleFAQClick}
              className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
            >
              {t("faq")}
            </button>
            <button
              onClick={handleBugReportClick}
              className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
            >
              {t("bugReport")}
            </button>
            <button
              onClick={handleResetDefaultClick}
              className="rounded-md px-1.5 py-2 text-red-500 hover:bg-red-50 focus-visible:bg-red-50 lg:px-4"
            >
              {t("resetDefault")}
            </button>
            <Link
              className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
              href="/resume-builder"
            >
              {t("createResume")}
            </Link>
            <LanguageSwitcher />{" "}
            <div className="ml-1 mt-1 hidden sm:block">
              <a
                href="https://dacbbox.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                大程开源百宝箱
              </a>
            </div>
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            className="rounded-md p-2 hover:bg-gray-100 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* 移动端下拉菜单 */}
          {menuOpen && (
            <div className="absolute left-0 right-0 top-[var(--top-nav-bar-height)] z-50 bg-white shadow-lg md:hidden">
              <div className="flex flex-col py-2">
                <button
                  onClick={handleFAQClick}
                  className="px-4 py-3 text-left text-gray-700 hover:bg-gray-100"
                >
                  {t("faq")}
                </button>
                <button
                  onClick={() => {
                    handleBugReportClick();
                    closeMenu();
                  }}
                  className="px-4 py-3 text-left text-gray-700 hover:bg-gray-100"
                >
                  {t("bugReport")}
                </button>

                <button
                  onClick={() => {
                    handleResetDefaultClick();
                    closeMenu();
                  }}
                  className="px-4 py-3 text-left text-red-600 hover:bg-red-50"
                >
                  {t("resetDefault")}
                </button>
                <Link
                  onClick={closeMenu}
                  className="px-4 py-3 text-gray-700 hover:bg-gray-100"
                  href="/resume-builder"
                >
                  {t("createResume")}
                </Link>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-gray-700">{t("language")}</span>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Bug反馈确认模态框 */}
      <ConfirmModal
        isOpen={bugReportModalOpen}
        onClose={() => setBugReportModalOpen(false)}
        onConfirm={handleBugReportConfirm}
        title={tModal("bugReport.title")}
        message={tModal("bugReport.message")}
        confirmText={tCommon("confirm")}
        cancelText={tCommon("cancel")}
      />

      {/* 恢复默认确认模态框 */}
      <ConfirmModal
        isOpen={resetDefaultModalOpen}
        onClose={() => setResetDefaultModalOpen(false)}
        onConfirm={handleResetDefaultConfirm}
        title={tModal("resetDefault.title")}
        message={tModal("resetDefault.message")}
        confirmText={tCommon("confirm")}
        cancelText={tCommon("cancel")}
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
      />
    </>
  );
};

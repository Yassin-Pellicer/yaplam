"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

export const Header = ({style = ""}: {style?: string}) => {
  const { i18n, t } = useTranslation();
  const rawSections = t("navigation.sections", { returnObjects: true });
  const sections = Array.isArray(rawSections) ? rawSections : [];

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOverlay, setMenuOverlay] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    setIsScrolled(window.scrollY > 50);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    setMenuOverlay(false);
  };

  return (
    <>
      <header
        className={`flex fixed top-0 w-full justify-between z-50 transition-all duration-300 px-4 py-4 sm:px-8 ${
          isScrolled ? `bg-black/20 backdrop-blur-sm text-white` : `bg-transparent ${style === "black" ? "text-black" : "text-white"}`
        }`}
      >
        <img
          src="/yo.jpg"
          alt="Logo"
          className={`h-8 w-8 rounded-full sm:h-12 sm:w-12 transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav className="hidden lg:flex gap-8 items-center">
          {sections.map((section, index) => (
            <button
              key={`${section}-${index}`}
              onClick={() => {scrollToSection(index.toString());}}
              className={`px-4 py-2 hover:bg-blue-400 hover:cursor-pointer rounded-2xl transition-colors`}
            >
              {section}
            </button>
          ))}

          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "es" ? "en" : "es")
            }
            className="material-symbols-outlined hover:cursor-pointer"
          >
            translate
          </button>
        </nav>

        <div className="lg:hidden flex items-center">
          <span
            className="material-symbols-outlined hover:cursor-pointer"
            style={{ fontSize: "28px", color: style === "black" ? "black" : "white" }}
            onClick={() => setMenuOverlay(!menuOverlay)}
          >
            menu
          </span>
        </div>
      </header>

      {menuOverlay && (
        <div
          className="fixed top-0 left-0 w-full h-screen pt-4 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMenuOverlay(false)}
        >
          <div
            className="flex flex-col h-full divide-y divide-white/30 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4 p-4 mt-16">
              {sections.map((section, index) => (
                <button
                  key={`${section}-${index}`}
                  onClick={() => scrollToSection(index.toString())}
                  className="text-white text-2xl py-2 px-4 rounded-xl text-left hover:bg-white/20 transition-colors"
                >
                  {section}
                </button>
              ))}

              <button
                onClick={() =>
                  i18n.changeLanguage(i18n.language === "es" ? "en" : "es")
                }
                className="material-symbols-outlined text-left ml-4 text-2xl mt-4"
                style={{ color:"white" }}
              >
                translate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


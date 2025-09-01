"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

export const Header = () => {
  const { i18n, t } = useTranslation();
  const rawSections = t("navigation.sections", { returnObjects: true });
  const sections = Array.isArray(rawSections) ? rawSections : [];
  
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (sections.length > 0) {
      setActiveSection(sections[0]);
    }
  }, [sections]);

  useEffect(() => {
    if (!isClient) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    setIsScrolled(window.scrollY > 50);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  const scrollToSection = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(section);
  };

  if (!isClient) {
    return(
      <></>
    )
  }

  return (
    <header
      className={`flex fixed top-0 w-fit justify-center z-50 transition-all duration-300 mt-4 rounded-full sm:px-4 px-1 ${
        isScrolled ? "bg-black/20 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto sm:px-4 px-2">
        <nav className="flex justify-between items-center py-4">
          <ul className="flex sm:space-x-8 sm:text-lg space-x-3 text-[12px]">
            {sections.map((section, index) => (
              <li key={`${section}-${index}`}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`text-white hover:cursor-pointer transition-colors capitalize ${
                    activeSection === section ? "border-b-2 border-blue-400" : ""
                  }`}
                >
                  {section}
                </button>
              </li>
            ))}

          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "es" ? "en" : "es")
            }
            className="material-symbols-outlined text-white hover:cursor-pointer" style={{ fontSize: "16px" }}
          >
            translate
          </button>
          </ul>
        </nav>
      </div>
    </header>
  );
};
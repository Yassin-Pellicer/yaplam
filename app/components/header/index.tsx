'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { i18n, t } = useTranslation();
  const sections = (t("navigation.sections", { returnObjects: true }) || []) as string[];
  console.log("sections:", sections);

  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
  };

  return (
    <header
      className={`flex fixed top-0 w-fit justify-center z-50 transition-all duration-300 mt-4 rounded-full sm:px-4 px-1 ${isScrolled ? "bg-black/20 backdrop-blur-lg" : "bg-transparent"}`}
    >
      <div className="max-w-6xl mx-auto sm:px-4 px-2">
        <nav className="flex justify-between items-center py-4">
          <ul className="flex sm:space-x-8 sm:text-lg space-x-3 text-[12px]">
            {sections && sections.map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`text-white hover:cursor-pointer hover:text-white transition-colors capitalize ${activeSection === section
                    ? "text-white border-b-2 border-blue-400"
                    : ""
                    }`}
                >
                  {section}
                </button>
              </li>
            ))}
            <div className="flex flex-row gap-4 items-center">
              <span onClick={() => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
                className="material-symbols-outlined hover:cursor-pointer text-white" style={{ fontSize: '1.5rem' }}>
                translate
              </span>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  )
}

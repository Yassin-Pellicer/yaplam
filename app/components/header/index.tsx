"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter, usePathname } from "next/navigation";

export const Header = ({ style = "" }: { style?: string }) => {
  const { i18n, t } = useTranslation();
  const rawSections = t("navigation.sections", { returnObjects: true });
  const sections = Array.isArray(rawSections) ? rawSections : [];

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOverlay, setMenuOverlay] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    setIsScrolled(window.scrollY > 50);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    if (section === "5") {
      router.push("/blog");
    } else if (pathname !== "/" && section !== "blog") {
      router.push("/")
      setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" }), 400);
    }
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    setMenuOverlay(false);
  };

  return (
    <>
      <header
        className={`flex fixed top-0 w-full justify-between items-center align-center h-14! z-50 transition-all duration-300 px-4 py-3 sm:px-8  
    ${style === "black"
            ? "bg-white text-black border-b border-gray-200"
            : isScrolled
              ? "bg-black/20 backdrop-blur-sm text-white border-white/20"
              : "bg-transparent text-white border-transparent"
          }`}
      >
        <img
          src="/yo.jpg"
          alt="Logo"
          onClick={() => router.push("/")}
          className={`h-8 w-8 rounded-full sm:h-8 sm:w-8 transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"
            }`}
        />
        <nav className="hidden lg:flex gap-8 items-center">
          {sections.map((section, index) => (
            <button
              key={`${section}-${index}`}
              onClick={() => { scrollToSection(index.toString()); }}
              className={`px-4 py-2 hover:text-white hover:bg-blue-400 hover:cursor-pointer rounded-2xl transition-colors`}
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
            className="flex flex-col h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col mt-10 divide-y border-t border-white/50 divide-white/50">
              {sections.map((section, index) => (
                <button
                  key={`${section}-${index}`}
                  onClick={() => scrollToSection(index.toString())}
                  className="text-white text-2xl text-right py-4 px-4 hover:bg-white/20 transition-colors"
                >
                  {section}
                </button>
              ))}

              <button
                onClick={() =>
                  i18n.changeLanguage(i18n.language === "es" ? "en" : "es")
                }
                className="material-symbols-outlined text-right px-4 border-b-[1px] border-white/50 pb-5 text-2xl mt-4"
                style={{ color: "white" }}
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


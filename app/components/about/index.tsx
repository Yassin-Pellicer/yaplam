import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Carousel } from "../carousel";

export const About = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch
    return <div className="sm:py-20 py-8" style={{ minHeight: "400px" }} />;
  }

  const items = t("carousel.items", { returnObjects: true }) as Array<{
    emoji: string;
    title: string;
    subtitle: string;
  }>;

  return (
    <section id="0" className="sm:py-20 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-white mb-4 tracking-tighter">
          {t("sections.about.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xl text-white">
              {t("sections.about.description")}
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              {t("sections.about.personal")}
            </p>
          </div>
          <Carousel items={items} />
        </div>
      </div>
    </section>
  );
};

import { useTranslation } from "next-i18next";
import { Github, Linkedin, Mail, Download } from "lucide-react";

export const Contact = () => {
  const { t, i18n } = useTranslation();

  const language = i18n.language;
  const curriculumUrl = language === "es" ? "/curriculum.pdf" : "/curriculum_english.pdf";

  return (
    <section id="4" className="py-40">
      <h2 className="text-5xl font-bold text-white mb-4 tracking-tighter">
        {t("sections.contact.title")}
      </h2>
      <div className="relative max-w-6xl mx-auto text-center">
        <div className="flex flex-col items-center gap-12">
          <img
            src="/yo.jpg"
            alt="Yassin Pellicer Lamla"
            className="absolute w-64 h-64 z-[-1] top-[-150] rounded-full object-cover border-white shadow-lg opacity-40 overflow-hidden"
          />
          <p className="sm:text-3xl text-xl bold mt-8 text-white">
            {t("sections.contact.message")}{" "}
            <span className="sm:text-4xl text-2xl font-bold">
              {t("sections.contact.cta")}{" "}
            </span>
            {t("sections.contact.subtitle")}
          </p>
          <div className="flex flex-row items-center flex-wrap justify-around gap-12">
            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/Yassin-Pellicer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all hover:scale-110"
              >
                <Github className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/yassin-pellicer/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all hover:scale-110"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
              <a
                href="mailto:yassinpellicerlamla@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all hover:scale-110"
              >
                <Mail className="w-6 h-6 text-white" />
              </a>
              <a
                href={curriculumUrl}
                download
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all hover:scale-110"
              >
                <Download className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

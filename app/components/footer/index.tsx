import { Trans, useTranslation } from "next-i18next";

export const Footer = ({style}: {style: string}) => {
  const { t } = useTranslation();

  return (
    <footer
      id="contacto"
      className={`py-8 w-full ${style === "black" ? "bg-gray-700 text-white" : "bg-black/30 backdrop-blur-md border-t border-white/10 text-gray-400"}`}
    >
      <div className="flex flex-row max-w-6xl mx-auto text-center justify-between align-center items-center px-4">
        <p className="sm:text-md text-xs hover:text-white transition duration-300">
          {t("sections.footer.copyright")}
        </p>
        <a
          href="mailto:yassinpellicerlamla@gmail.com"
          className="sm:text-md text-xs hover:text-white transition duration-300"
        >
          {t("sections.footer.contact")}
        </a>
      </div>
    </footer>
  );
};

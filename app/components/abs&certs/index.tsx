import { useTranslation } from 'react-i18next';

export const AbsCerts = () => {

  const { t } = useTranslation();

  const rawSkills = t("sections.skills.items", { returnObjects: true });
  const skills = Array.isArray(rawSkills) ? rawSkills : [] as Array<{ id: number; name: string; icon: string, level: string, description: string, color: string }>;
  const rawCerts = t("sections.certifications.items", { returnObjects: true });
  const certs = Array.isArray(rawCerts) ? rawCerts : [] as Array<{ id: number; name: string; icon: string, level: string, description: string, color: string, link: string, platform: string, date: string }>;

  return (
    <>
      <section
        id="2"
        className="flex-col sm:pt-20 pt-8 sm:pb-0! pb-8"
      >
        <h2 className="sm:text-5xl text-4xl font-bold text-white tracking-tighter mb-6">
          {t("sections.skills.title")}
        </h2>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
          {skills.map((skill, index) => {
            return (
              <div
                key={index}
                className={`${skill.color} backdrop-blur-md rounded-2xl sm:p-8 p-4 border border-white/10 hover:shadow-md transition-all duration-200`}
              >
                <div className="flex flex-col mb-4">
                  <div className="flex flex-row items-center gap-4 mb-4 flex-wrap">
                    <i className={`${skill.icon} text-white text-3xl`}></i>
                    <h3 className="sm:text-xl font-bold sm:mb-2 text-white">
                      {skill.name}
                    </h3>
                  </div>
                  <h3 className="sm:text-md text-sm text-white">
                    {skill.description}
                  </h3>
                </div>
                <span
                  className={`bg-white/10 backdrop-blur-md rounded-full p-2 flex text-white text-sm w-fit px-4 py-2`}
                >
                  {skill.level}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section id="habilidades" className="flex-col sm:py-20">
        <h2 className="sm:text-5xl text-4xl font-bold text-white tracking-tighter mb-6">
          {t("sections.certifications.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {certs.map((skill, index) => {
            return (
              <div
                key={index}
                className="backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:scale-[1.02] hover:shadow-md transition-all duration-200 hover:cursor-pointer bg-white/20 text-white"
                onClick={() => window.open(skill.link, "_blank")}
              >
                <div className="flex flex-col mb-4">
                  <div className="flex flex-row items-center gap-4 mb-2">
                    <i className={`${skill.icon} text-3xl`}></i>
                    <h3 className="text-xl font-bold mb-2">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="flex flex-row justify-between items-center gap-4 mb-2">
                    <h3 className="text-xl font-bold mb-2 ">
                      🏫 {skill.platform}
                    </h3>
                    <h3 className="text-xl font-bold mb-2 ">
                      🗓️ {skill.date}
                    </h3>
                  </div>
                  <h3 className="text-md mb-10">
                    {skill.description}
                  </h3>
                </div>
                <div className="absolute bottom-6 left-6 flex flex-row items-center justify-center gap-2 bg-green-100 w-fit rounded-full px-3 py-2 text-black font-bold tracking-tighter border-2 border-green-500">
                  <div className="relative h-4 w-4 rounded-full bg-green-500 animate-pulse">
                    <div className="absolute h-4 w-4 rounded-full bg-green-500 animate-[ping_0.75s_infinite]"></div>
                  </div>
                  Certificado disponible{" "}
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                  >
                    open_in_new
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
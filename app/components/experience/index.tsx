import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

export const Experience = () => {

  const { i18n, t } = useTranslation();

  const rawExperiences = t("sections.experience.experiences", { returnObjects: true });
  const experiences = Array.isArray(rawExperiences) ? rawExperiences : [];

  const [selectedExperience, setSelectedExperience] = useState<{ content: { paragraph: string; list: string[] }, id: number; company: string; position: string; period: string; description: string } | null>(null);

  useEffect(() => {
    setSelectedExperience(
      experiences.find((exp) => exp.id === selectedExperience?.id) || experiences[0]
    );
  }, [i18n.language]);

  return (
    <section id="1" className="sm:py-20 py-8">
      <div className="flex flex-row flex-wrap justify-between AI-align-center items-center mb-6 gap-6">
        <h2 className="sm:text-5xl text-4xl font-bold text-white tracking-tighter ">
          {" "}
          {t("sections.experience.title")}
        </h2>
        <div className="flex flex-row items-center justify-center gap-2 bg-green-100 w-fit rounded-full px-3 py-2 text-black font-bold tracking-tighter border-2 border-green-500">
          <div className="relative h-4 w-4 rounded-full bg-green-500 animate-pulse">
            <div className="absolute h-4 w-4 rounded-full bg-green-500 animate-[ping_0.75s_infinite]"></div>
          </div>
          Open to Work! 😊
        </div>
      </div>
      <div className=" grid md:grid-cols-2 gap-4 items-center">
        <div className="max-w-6xl mx-auto space-y-4 w-full">
          {experiences.map((exp: any, index) => (
            <div key={index} className="relative flex flex-row">
              <div
                onClick={() => setSelectedExperience(exp)}
                key={index}
                className={`hover:cursor-pointer bg-black/20 bg-opacity-50 backdrop-blur-lg rounded-2xl sm:p-6 px-4 py-2 border border-white/20 ${selectedExperience === exp.id ? "bg-blue-900" : ""
                  } hover:bg-black/30 hover:bg-opacity-50 transition-all duration-300 hover:scale-[1.01] w-full`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                  <div>
                    <h3 className="tracking-tighter sm:text-2xl text-lg font-bold text-white mb-2 mr-8">
                      {exp.position}
                    </h3>
                    <h4 className="sm:text-xl text-md text-white mb-2">
                      {exp.company}
                    </h4>
                  </div>
                  <span className="text-white sm:text-lg text-sm font-medium shrink-0">
                    {exp.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-full bg-black/20 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 w-full">
            <div className="flex flex-col">
              <h3 className="text-3xl tracking-tight font-bold text-white mb-2">
                {selectedExperience?.position}
              </h3>
              <div className="flex flex-row justify-between items-center align-center mb-2">
                <h4 className="text-xl text-white ">
                  {selectedExperience?.period}
                </h4>
                <p className="text-gray-200 text-sm">
                  {selectedExperience?.company}
                </p>
              </div>
              <p className="text-white text-lg tracking-tight font-bold">
                {selectedExperience?.description}
              </p>
              <hr className="text-white mt-2" />
              <p className="text-white text-md mt-6 tracking-tight">
                {selectedExperience?.content.paragraph}
              </p>
              {selectedExperience?.content.list.map((item: string, index: number) => (
                <li key={index} className="text-white text-md mt-2 tracking-tight">
                  {item}
                </li>
              ))}
            </div>
          </div>
          <div
          ></div>
        </div>
      </div>
    </section>
  )
}
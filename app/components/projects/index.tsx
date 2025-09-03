import { useEffect, useState } from "react";
import { Trans, useTranslation } from "next-i18next";
import { InView } from "react-intersection-observer";
import { InViewSection } from "../motion";

export default () => {

  const { t } = useTranslation();

  const projects = t("sections.projects.items", { returnObjects: true }) as Array<{
    indev?: boolean;
    route: string;
    title: string;
    icon: string;
    technologies: Array<string>;
    date: string;
    description: string;
    content: string[];
    link: string;
    color: string;
    gallery?: {
      images: Array<string>;
      videos: Array<string>;
      maxH: number;
    };
    projects?: string;
  }>;

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const selectedProject = projects[selectedProjectIndex];
  const [option, setOption] = useState("about");

  useEffect(() => {
    if (!selectedProject.gallery) setOption("about");
  }, [selectedProject]);

  return (
    <>
      <section id="3" className="sm:py-20 pb-0! py-16">
        <h2 className="sm:text-5xl text-4xl font-bold text-white tracking-tighter mb-6">
          {t("sections.projects.title")}
        </h2>
        <div
          className="overflow-y-hidden scrollbar-hide w-full cursor-grab active:cursor-grabbing scroll-smooth"
        >
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={(e) => {
                  setSelectedProjectIndex(index);
                }}
                className={`snap-center relative ${project.color} pb-4 backdrop-blur-md rounded-2xl p-6 border ${selectedProjectIndex === index
                  ? "border-white"
                  : "border-white/10"} hover:shadow-md hover:${project.color}/10 transition-all duration-200 cursor-pointer w-full flex-wrap`}
              >
                {project.indev && (
                  <div className="absolute bottom-4 right-4 flex flex-row shadow-xl items-center justify-center gap-2 bg-green-100 w-fit rounded-full px-3 text-black font-bold tracking-tighter border-2 border-red-500">
                    <div className="relative h-2 w-2 rounded-full bg-red-500 animate-pulse">
                      <div className="absolute h-2 w-2 rounded-full bg-red-500 animate-[ping_0.75s_infinite]"></div>
                    </div>
                    <span className="text-sm">🚀</span>
                  </div>
                )}
                <div className="flex flex-col mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-5xl">{project.icon}</span>
                    <h3 className="text-xl tracking-tight font-bold text-white mt-1 align-center">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-white items-center flex gap-2">
                      <span className="material-symbols-outlined">event</span>{t("sections.projects.developedIn")}{" "}
                      {project.date}
                    </h3>
                    <div className="flex gap-2">
                      {project.technologies.map((tech, index) => (
                        <i key={index} className={`${tech} text-white text-md`}></i>
                      ))}
                    </div>
                  </div>
                  <hr className="border-t-2 border-white/50 my-4" />
                  <p className="text-white text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between flex-row items-center w-full mb-4">
          <button
            onClick={() => {
              if (selectedProjectIndex > 0) {
                setSelectedProjectIndex(selectedProjectIndex - 1);
              } else {
                setSelectedProjectIndex(projects.length - 1);
              }
            }}
            aria-label="Scroll left"
            className="flex flex-col justify-center w-10 h-10 z-10 0 bg-black/40 hover:bg-black/70 text-white rounded-full shrink-0"
            style={{ userSelect: "none" }}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={() => {
              if (selectedProjectIndex < projects.length - 1) {
                setSelectedProjectIndex(selectedProjectIndex + 1);
              } else {
                setSelectedProjectIndex(0);
              }
            }}
            aria-label="Scroll left"
            className="flex flex-col justify-center w-10 h-10 z-10 0 bg-black/40 hover:bg-black/70 text-white rounded-full shrink-0"
            style={{ userSelect: "none" }}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>
      <InViewSection triggerKey={selectedProject.title}>
        <div
          className={`snap-center relative backdrop-blur-md rounded-2xl p-6 border bg-blue-900 border-white/10 hover:shadow-md transition-all duration-200 pb-8`}
        >
          <div className="flex flex-col md:flex-row gap-6 flex-wrap md:flex-nowrap">
            <div className="flex flex-col w-full md:w-1/2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-5xl">{selectedProject.icon}</span>
                <h3 className="text-2xl font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <div className="flex justify-between items-center gap-4">
                <h3 className="text-lg font-bold text-white items-center flex gap-2">
                  <span className="material-symbols-outlined">event</span>{t("sections.projects.developedIn")}{" "}
                  {selectedProject.date}
                </h3>
                <div className="flex gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <i key={index} className={`${tech} text-white text-xl`}></i>
                  ))}
                </div>
              </div>
              <img key={selectedProject.title} src={selectedProject.route} className="object-cover mt-4 rounded-xl w-full max-h-[250px]"></img>
              <hr className="border-t-2 border-white/50 my-4" />
              <p className="text-white text-md font-bold">
                {selectedProject.description}
              </p>
              <div className="grid grid-cols-[40%_60%] gap-2 items-stretch mt-4">
                <div
                  onClick={() => window.open(selectedProject.link, "_blank")}
                  className="hover:bg-green-500 w-full justify-center hover:text-white flex items-center gap-2 bg-green-100 rounded-xl px-3 py-2 text-black font-bold tracking-tighter border-2 border-green-500 transition-all duration-200 h-full"
                >
                  Ver código
                  <span
                    className="devicon-github-plain"
                    style={{ fontSize: "18px" }}
                  ></span>
                </div>

                {selectedProject.indev && (
                  <div className="flex flex-row shadow-xl items-center justify-center gap-2 bg-green-100 w-full rounded-xl px-3 text-black font-bold tracking-tighter border-2 border-red-500 h-full">
                    <div className="relative h-2 w-2 rounded-full bg-red-500 animate-pulse">
                      <div className="absolute h-2 w-2 rounded-full bg-red-500 animate-[ping_0.75s_infinite]"></div>
                    </div>
                    <span className="text-md">{t("sections.projects.inDevelopment")}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <div className="flex justify-between text-white! bg-transparent mb-8">
                <button
                  className={`flex w-full py-2 font-bold tracking-tighter px-4 transition-all hover:cursor-pointer duration-50 items-center align-center justify-center ${option === "about" ? "border-b-2 border-white mt-[-1px]" : ""}`}
                  onClick={() => setOption("about")}
                >
                  <span className="material-symbols-outlined mr-2">info</span> About the project
                </button>
                {selectedProject.gallery && <button
                  className={`flex w-full py-2 font-bold tracking-tighter px-4 transition-all hover:cursor-pointer duration-50 items-center align-center justify-center ${option === "gallery" ? "border-b-2 border-white mt-[-1px]" : ""}`}
                  onClick={() => setOption("gallery")}
                >
                  <span className="material-symbols-outlined mr-2">photo</span> Gallery and demos
                </button>}
              </div>
              {option === "about" && selectedProject.content.map((line, index) => (
                <p key={index} className="text-white text-base">
                  <Trans
                    i18nKey={line}
                    components={[
                      <span key="0" className="font-bold text-white" />,
                      <b key="1" className="text-white text-xl" />,
                    ]} />
                </p>
              ))}
              {option === "gallery" && (() => {
                const media = [
                  ...(selectedProject.gallery?.images?.map(src => ({ type: "image", src })) || []),
                  ...(selectedProject.gallery?.videos?.map(src => ({ type: "video", src })) || []),
                ];
                const maxHeight = selectedProject.gallery?.maxH || 400;
                return (
                  <div
                    key={selectedProjectIndex}
                    className="grid gap-4 overflow-auto"
                    style={{ maxHeight: `${maxHeight}px` }}
                  >
                    {media.map((item, index) =>
                      item.type === "image" ? (
                        <img
                          key={`${selectedProjectIndex}-img-${index}`}
                          src={item.src}
                          className="object-cover w-full rounded-xl select-none hover:cursor-default"
                        />
                      ) : (
                        <video
                          key={`${selectedProjectIndex}-vid-${index}`}
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="object-cover w-full h-full rounded-xl"
                        />
                      )
                    )}
                  </div>
                );
              })()}

            </div>
          </div>
        </div>
      </InViewSection>
    </>
  );
};


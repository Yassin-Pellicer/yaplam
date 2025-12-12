import { useEffect, useState, useCallback } from "react";
import { Trans, useTranslation } from "next-i18next";
import { InView } from "react-intersection-observer";
import { InViewSection } from "../motion";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    skipSnaps: false,
    dragFree: true,
    containScroll: 'trimSnaps'
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      const newIndex = emblaApi.selectedScrollSnap();
      setSelectedProjectIndex(newIndex);
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      const newIndex = emblaApi.selectedScrollSnap();
      setSelectedProjectIndex(newIndex);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!selectedProject.gallery) setOption("about");
  }, [selectedProject]);

  return (
    <>
      <section id="3">
        <h2 className="sm:text-5xl text-4xl font-bold text-white tracking-tighter mb-6">
          {t("sections.projects.title")}
        </h2>
        
        <div className="relative max-w-sm md:max-w-2xl lg:max-w-5xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    setSelectedProjectIndex(index);
                  }}
                  className={`flex-none w-fit md:w-[calc(50%-8px)] lg:w-[calc(33%-8px)] snap-center relative ${project.color} pb-4 backdrop-blur-md rounded-2xl border ${
                    selectedProjectIndex === index
                      ? "border-white shadow-lg"
                      : "border-white/10"
                  } hover:shadow-md transition-all flex duration-200 cursor-pointer`}
                >
                  {project.indev && (
                    <div className="absolute top-4 right-4 flex flex-row shadow-xl items-center justify-center gap-2 bg-green-100 w-fit rounded-full px-3 text-black font-bold tracking-tighter border-2 border-red-500 z-10">
                      <div className="relative h-2 w-2 rounded-full bg-red-500 animate-pulse">
                        <div className="absolute h-2 w-2 rounded-full bg-red-500 animate-[ping_0.75s_infinite]"></div>
                      </div>
                      <span className="text-sm">🚀</span>
                    </div>
                  )}
                  <div className="flex flex-col mb-2">
                    <img
                      src={project.gallery?.images[0]}
                      alt={project.title}
                      className="rounded-t-xl mb-4 max-h-[250px] object-cover w-full"
                    />
                    <div className="flex items-center gap-2 mb-2 px-4">
                      <h3 className="text-2xl tracking-tight font-bold text-white mt-1 align-center">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center gap-4 px-6">
                      <h3 className="text-lg font-bold text-white items-center flex gap-2">
                        <span className="material-symbols-outlined">event</span>{t("sections.projects.developedIn")}{" "}
                        {project.date}
                      </h3>
                      <div className="flex gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <i key={techIndex} className={`${tech} text-white text-md`}></i>
                        ))}
                      </div>
                    </div>
                    <hr className="border-t-2 border-white/50 my-4" />
                    <p className="text-white text-lg px-6">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between flex-row items-center w-full mb-4 mt-4">
          <button
            onClick={scrollPrev}
            aria-label="Scroll left"
            className="flex flex-col justify-center items-center w-10 h-10 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full shrink-0 transition-colors"
            style={{ userSelect: "none" }}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedProjectIndex(index);
                  emblaApi?.scrollTo(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedProjectIndex === index
                    ? "w-8 bg-white"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            aria-label="Scroll right"
            className="flex flex-col justify-center items-center w-10 h-10 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full shrink-0 transition-colors"
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
              <div className="sm:flex hidden items-center gap-2 mb-2">
                <span className="text-4xl">{selectedProject.icon}</span>
                <h3 className="text-2xl font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <div className="sm:flex hidden justify-between items-center gap-4">
                <h3 className="text-lg font-bold text-white items-center flex gap-2">
                  <span className="material-symbols-outlined">event</span>{t("sections.projects.developedIn")}{" "}
                  {selectedProject.date}
                </h3>
                <div className="sm:flex hidden gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <i key={index} className={`${tech} text-white text-xl`}></i>
                  ))}
                </div>
              </div>
              <img key={selectedProject.title} src={selectedProject.route} className="sm:block hidden object-cover mt-4 rounded-xl w-full max-h-[250px]"></img>
              <hr className="border-t-2 border-white/50 sm:my-4 sm:flex hidden" />
              <p className="text-white text-md font-bold sm:flex hidden">
                {selectedProject.description}
              </p>
              <div className="sm:grid flex flex-col sm:grid-cols-[40%_60%] gap-2 items-stretch mt-4">
                <div
                  onClick={() => window.open(selectedProject.link, "_blank")}
                  className="hover:bg-green-500 w-full justify-center hover:text-white flex items-center gap-2 bg-green-100 rounded-xl px-3 py-2 text-black font-bold tracking-tighter border-2 border-green-500 transition-all duration-200 h-full cursor-pointer"
                >
                  Ver código
                  <span
                    className="devicon-github-plain"
                    style={{ fontSize: "18px" }}
                  ></span>
                </div>

                {selectedProject.indev && (
                  <div className="flex flex-row shadow-xl items-center justify-center gap-2 bg-green-100 w-full rounded-xl px-3 py-2 text-black font-bold tracking-tighter border-2 border-red-500 h-full">
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
                {selectedProject.gallery && selectedProject.gallery.images.length > 1 && <button
                  className={`flex w-full py-2 font-bold tracking-tighter px-4 transition-all hover:cursor-pointer duration-50 items-center align-center justify-center ${option === "gallery" ? "border-b-2 border-white mt-[-1px]" : ""}`}
                  onClick={() => setOption("gallery")}
                >
                  <span className="material-symbols-outlined mr-2">photo</span> Gallery and demos
                </button>}
              </div>
              {option === "about" &&
                <div
                  className="text-white text-base"
                  dangerouslySetInnerHTML={{ __html: selectedProject.content }}
                />
              }
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
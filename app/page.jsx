"use client";

import "./lib/18n";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Palette,
  Server,
  Database,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

import "devicon/devicon.min.css";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { InViewSection } from "./components/motion";
import { About } from "./components/about";
import { Experience } from "./components/experience";



export default function Portfolio() {
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const baseColors = [
      "bg-orange-600/90",
      "bg-blue-600/90",
      "bg-green-600/90",
      "bg-red-600/90",
      "bg-yellow-600/90",
      "bg-purple-600/90",
      "bg-pink-600/90",
      "bg-teal-600/90",
      "bg-indigo-600/90",
      "bg-gray-600/90",
      "bg-rose-600/90",
      "bg-lime-600/90",
      "bg-emerald-600/90",
      "bg-cyan-600/90",
      "bg-violet-600/90",
    ];
    for (let i = 0; i < baseColors.length; i++) {
      const random = baseColors[Math.floor(Math.random() * baseColors.length)];
      setSelectedColor((prev) => [...prev, random]);
    }
  }, []);

  const skills = [
    {
      name: "Frontend Development",
      icon: "devicon-react-original",
      level: "Avanzado",
      description:
        "Experiencia sólida construyendo interfaces con React y tecnologías modernas del frontend.",
    },
    {
      name: "UI/UX Design",
      icon: "devicon-figma-plain",
      level: "Medio",
      description:
        "Diseño de interfaces intuitivas con enfoque en experiencia de usuario utilizando herramientas como Figma.",
    },
    {
      name: "Backend Development",
      icon: "devicon-nodejs-plain",
      level: "Avanzado",
      description:
        "Desarrollo de APIs y lógica del servidor utilizando Node.js y Express.",
    },
    {
      name: "Database Management",
      icon: "devicon-postgresql-plain",
      level: "Medio",
      description:
        "Gestión y diseño de bases de datos relacionales con PostgreSQL y MongoDB.",
    },
    {
      name: "TypeScript",
      icon: "devicon-typescript-plain",
      level: "Medio",
      description:
        "Uso de TypeScript para garantizar tipado fuerte y escalabilidad en proyectos grandes.",
    },
    {
      name: "Next.js",
      icon: "devicon-nextjs-plain",
      level: "Avanzado",
      description:
        "Framework principal para SSR y generación estática de páginas con React.",
    },
    {
      name: "Git & GitHub",
      icon: "devicon-git-plain",
      level: "Avanzado",
      description:
        "Control de versiones eficiente y trabajo colaborativo mediante ramas y pull requests.",
    },
    {
      name: "PHP",
      icon: "devicon-php-plain",
      level: "Medio",
      description:
        "Desarrollo de aplicaciones web dinámicas y gestión de servidores con PHP.",
    },
    {
      name: "Tailwind CSS",
      icon: "devicon-tailwindcss-plain",
      level: "Avanzado",
      description:
        "Estilos y componentes reutilizables con Tailwind CSS para un diseño moderno y adaptable.",
    },
  ];

  const projects = [
    {
      indev: true,
      route: "/tutorgo.png",
      title:
        "TutorGo, una herramienta para tutores particulares y profesionales",
      icon: "👨🏻‍🏫",
      technologies: [
        "devicon-react-original",
        "devicon-nodejs-plain",
        "devicon-postgresql-plain",
        "devicon-nextjs-plain",
        "devicon-figma-plain",
        "devicon-amazonwebservices-plain",
      ],
      date: "2025",
      description: `Plataforma de gestión de tutorías y cursos online y presenciales, con funcionalidades de gestión de contenido.`,
      content: `
      <p style="color: white; font-size: 1.125rem; margin-bottom: 1rem;">
        TutorGo es una <b>plataforma de gestión de tutorías y cursos online y presenciales</b>, diseñada para tutores particulares y profesionales que buscan digitalizar y organizar su oferta educativa.
      </p>
      <hr style="border-color: white; margin: 1rem 0;" />
      <ul style="color: white; font-size: 1rem; margin-left: 1.25rem; margin-bottom: 1rem; list-style-type: disc;">
        <li style="margin-bottom: 0.5rem;">
          Permite gestionar contenido educativo, incluyendo materiales, horarios, alumnos y sesiones.
        </li>
        <li style="margin-bottom: 0.5rem;">
          Ofrece herramientas para organizar cursos online o presenciales de forma eficiente.
        </li>
        <li style="margin-bottom: 0.5rem;">
          Construida con tecnologías modernas como React, Next.js, Node.js y PostgreSQL, y diseñada con Figma.
        </li>
        <li style="margin-bottom: 0.5rem;">
          Integración con servicios de AWS para almacenamiento y despliegue.
        </li>
      </ul>
      <hr style="border-color: white; margin: 1rem 0;" />
      <p style="color: white; font-size: 1rem; margin-bottom: 1rem;">
        TutorGo nace con el objetivo de <b>potenciar la enseñanza personalizada</b>, simplificando la gestión tanto para tutores como para alumnos.
      </p>
      <video style="width: 100%;" controls>
        <source src="/modalverbs.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    `,
      link: "https://github.com/Yassin-Pellicer/s3md",
    },
    {
      route: "/pinpoint.png",
      title: "Pinpoint, la plataforma de eventos gratuita",
      icon: "🗺️",
      technologies: [
        "devicon-react-original",
        "devicon-nodejs-plain",
        "devicon-postgresql-plain",
        "devicon-nextjs-plain",
        "devicon-figma-plain",
      ],
      date: "2024",
      description: `Plataforma de publicación de eventos gratis, accesible y con características de red social en un mapa global.`,
      content: `
      <p style="color: white; font-size: 1.125rem; margin-bottom: 1rem;">
        Pinpoint es una plataforma web (que presenté como trabajo de final de grado) <b>que permite a los usuarios crear, compartir y explorar eventos e itinerarios mediante puntos de control geolocalizados sobre un mapa interactivo </b>.
      </p>
      <hr style="border-color: white; margin: 1rem 0;" />
      <ul style="color: white; font-size: 1rem; margin-left: 1.25rem; margin-bottom: 1rem; list-style-type: disc;">
        <li style="margin-bottom: 0.5rem;">
          Permite asociar a cada punto de control información adicional como material multimedia o códigos QR.
        </li>
        <li style="margin-bottom: 0.5rem;">
          Incluye funcionalidades como creación de eventos públicos o privados, inscripciones, y gestión de visibilidad.
        </li>
        <li style="margin-bottom: 0.5rem;">
          Implementada con tecnologías modernas como Next.js y React, integrando gestión de estado global, internacionalización (i18n) y un diseño centrado en el usuario.
        </li>
      </ul>
      <hr style="border-color: white; margin: 1rem 0;" />
      <p style="color: white; font-size: 1rem; margin-bottom: 1rem;">
        Pinpoint no solo es una herramienta versátil, sino también un proyecto con propósito social: democratiza la organización de eventos sin necesidad de plataformas comerciales o publicidad.
      </p>
      <video style="width: 100%;" controls>
        <source src="/pinpoint.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    `,
      link: "https://github.com/Yassin-Pellicer/pinpoint",
    },
    {
      route: "/gol.png",
      title: "Varios juegos y proyectos pequeños",
      icon: "🎮",
      technologies: [
        "devicon-nodejs-plain",
        "devicon-html5-plain",
        "devicon-css3-plain",
        "devicon-javascript-plain",
      ],
      date: "2023",
      description: `Varios proyectos pequeños y juegos que me permiten aplicar mis habilidades en diferentes contextos.`,
      content: `
      <div class="text-white text-base md:text-lg space-y-6">
        <p>
          En este repositorio se encuentran algunos proyectos personales que me permiten aplicar mis habilidades en diferentes contextos. Estos incluyen desde compiladores hasta simulaciones gráficas y juegos clásicos implementados desde cero:
        </p>

        <hr style="border-color: white; margin: 1rem 0;" />

        <ul class="list-disc list-inside space-y-4">
          <li>
            <span class="font-semibold text-white">Compilador de C:</span> Un compilador para un subconjunto del lenguaje C, desarrollado como proyecto para la asignatura de Compiladores en la UPV. Permite analizar, optimizar y generar código a partir de programas escritos en dicho lenguaje.
          </li>
          <li>
            <span class="font-semibold text-white">Scraper de Wikipedia:</span> Herramienta que extrae contenido de Wikipedia y lo presenta en un formato más limpio y estructurado, facilitando su lectura y análisis.
          </li>
          <li>
            <span class="font-semibold text-white">Conjunto de Mandelbrot:</span> Visualización interactiva de este famoso conjunto fractal. Permite explorar su estructura a diferentes escalas con alto detalle 
          </li>
          <li>
            <span class="font-semibold text-white">Máquina de Turing:</span> Simulador de una máquina de Turing implementado en JavaScript, ideal para ilustrar conceptos de computabilidad y lógica formal.
          </li>
          <li>
            <span class="font-semibold text-white">Snake Game:</span> Implementación del clásico juego de la serpiente en un entorno gráfico personalizado. El jugador controla una serpiente que debe recoger comida sin chocar contra los bordes ni su propio cuerpo 
          </li>
          <li>
            <span class="font-semibold text-white">Brick Breaker:</span> Versión interactiva del clásico juego en el que se controla una paleta para romper bloques con una pelota que rebota 
          </li>
        </ul>

        <hr style="border-color: white; margin: 1rem 0;" />

        <p class="text-sm md:text-base text-gray-300">
          Todos estos proyectos no solo han reforzado mis conocimientos técnicos en programación, estructuras de datos y algoritmia, sino que también han sido una excelente oportunidad para trabajar con interfaces gráficas, visualizaciones interactivas y lógica de juegos.
        </p>
      </div>
      `,
      link: "https://github.com/Yassin-Pellicer/Miscellaneous",
    },
  ];

  const certifications = [
    {
      id: 1,
      name: "Aprendizaje automático (machine learning) y ciencia de datos.",
      link: "https://courses.edx.org/certificates/701dafa629a54605844f0478cb45e488",
      platform: "edX",
      date: "2024",
      description:
        "Reconocer el valor de los datos para el negocio, aplicar técnicas de aprendizaje automático, usar herramientas de preparación y visualización de datos, y manejar R para análisis y modelado.",
      icon: "devicon-python-plain",
    },
    {
      id: 2,
      name: "Fundamentos de ciberseguridad.",
      link: "https://courses.edx.org/certificates/e741dbb335cc428a98532a61832520a8",
      platform: "edX",
      date: "2024",
      description:
        "Identificar los riesgos presentes en la web y como protegerse contra ellos, comprender la estructura de una red y entender la seguridad de los protocolos de transporte y aplicaciones.",
      icon: "devicon-kalilinux-original",
    },
  ];

  return (
    <div className="flex justify-center flex-col items-center bg-gradient-to-br from-blue-500 to-blue-900 select-none">
      <section className="flex flex-col items-center min-h-screen max-w-6xl sm:px-12 px-4">
        <Header></Header>

        <InViewSection>
          <Hero></Hero>
        </InViewSection>

        <InViewSection>
          <About></About>
        </InViewSection>
         
        <InViewSection>
          <Experience></Experience> 
        </InViewSection>

        {/* Abilities and Certifications Section */}
        <InViewSection>
          <section
            id="habilidades"
            className="flex-col sm:pt-20 pt-8 sm:pb-0! pb-8"
          >
            <h2 className="sm:text-5xl text-4xl font-bold text-white tracking-tighter mb-6">
              ✨ Habilidades
            </h2>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
              {skills.map((skill, index) => {
                return (
                  <div
                    key={index}
                    className={`${selectedColor[index]} backdrop-blur-md rounded-2xl sm:p-8 p-4 border border-white/10 hover:scale-[1.02] hover:shadow-md transition-all duration-200`}
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
              🎖️ Certificaciones
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((skill, index) => {
                return (
                  <div
                    key={index}
                    className={`${selectedColor[index]} backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:scale-[1.02] hover:shadow-md transition-all duration-200 hover:cursor-pointer`}
                    onClick={() => window.open(skill.link, "_blank")}
                  >
                    <div className="flex flex-col mb-4">
                      <div className="flex flex-row items-center gap-4 mb-2">
                        <i className={`${skill.icon} text-white text-3xl`}></i>
                        <h3 className="text-xl font-bold mb-2 text-white">
                          {skill.name}
                        </h3>
                      </div>
                      <div className="flex flex-row justify-between items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold mb-2 text-white">
                          🏫 {skill.platform}
                        </h3>
                        <h3 className="text-xl font-bold mb-2 text-white">
                          🗓️ {skill.date}
                        </h3>
                      </div>
                      <h3 className="text-md text-white mb-10">
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
        </InViewSection>

        {/* Projects Section */}
        <InViewSection>
          <section id="proyectos" className="sm:py-20 pb-0! py-16">
            <h2 className="sm:text-5xl text-4xl font-bold text-white tracking-tighter mb-6">
              💻 Proyectos
            </h2>
            {/* Left scroll button */}
            <div
              ref={scrollRef}
              className="overflow-y-hidden scrollbar-hide w-full cursor-grab active:cursor-grabbing scroll-smooth"
            >
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4">
                {projects.map((skill, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      setSelectedProject(index);
                    }}
                    className={`snap-center relative ${
                      selectedColor[index + 2]
                    } pb-4 backdrop-blur-md rounded-2xl p-6 border ${
                      selectedProject === index
                        ? "border-white"
                        : "border-white/10"
                    } hover:shadow-md hover:${
                      selectedColor[index + 2]
                    }/10 transition-all duration-200 cursor-pointer w-full flex-wrap`}
                  >
                    {skill.indev && (
                      <div className="absolute bottom-4 right-4 flex flex-row shadow-xl items-center justify-center gap-2 bg-green-100 w-fit rounded-full px-3 text-black font-bold tracking-tighter border-2 border-red-500">
                        <div className="relative h-2 w-2 rounded-full bg-red-500 animate-pulse">
                          <div className="absolute h-2 w-2 rounded-full bg-red-500 animate-[ping_0.75s_infinite]"></div>
                        </div>
                        <span className="text-sm">🚀</span>
                      </div>
                    )}
                    <div className="flex flex-col mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-5xl">{skill.icon}</span>
                        <h3 className="text-xl tracking-tight font-bold text-white">
                          {skill.title}
                        </h3>
                      </div>
                      <div className="flex justify-between items-center gap-4">
                        <h3 className="text-sm font-bold text-white">
                          🗓️ Desarrollado en {skill.date}
                        </h3>
                        <div className="flex gap-2">
                          {skill.technologies.map((tech, index) => (
                            <i className={`${tech} text-white text-md`}></i>
                          ))}
                        </div>
                      </div>
                      <hr className="border-t-2 border-white/50 my-4" />
                      <p className="text-white text-sm">{skill.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between flex-row items-center w-full mb-4">
              <button
                onClick={() => {
                  if (selectedProject > 0) {
                    setSelectedProject(selectedProject - 1);
                  } else {
                    setSelectedProject(projects.length - 1);
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
                  if (selectedProject < projects.length - 1) {
                    setSelectedProject(selectedProject + 1);
                  } else {
                    setSelectedProject(0);
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
        </InViewSection>

        <InViewSection triggerKey={selectedProject}>
          <div
            className={`snap-center relative backdrop-blur-md rounded-2xl p-6 border bg-blue-900 border-white/10 hover:shadow-md transition-all duration-200 cursor-pointer pb-8`}
          >
            {projects.find((p, i) => i === selectedProject)?.indev && (
              <div className="absolute top-4 left-4 flex flex-row shadow-xl items-center justify-center gap-2 bg-green-100 w-fit rounded-full px-3 text-black font-bold tracking-tighter border-2 border-red-500">
                <div className="relative h-2 w-2 rounded-full bg-red-500 animate-pulse">
                  <div className="absolute h-2 w-2 rounded-full bg-red-500 animate-[ping_0.75s_infinite]"></div>
                </div>
                <span className="text-md"> ¡Actualmente en desarrollo! 🚀</span>
              </div>
            )}
            <div className="flex flex-wrap md:flex-nowrap gap-4 flex-row mb-6">
              <img
                src={projects.find((p, i) => i === selectedProject)?.route}
                className="w-full h-68 rounded-lg object-cover"
                alt=""
              />
              <div className="flex flex-col md:ml-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-5xl">
                    {projects.find((p, i) => i === selectedProject)?.icon}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {projects.find((p, i) => i === selectedProject)?.title}
                  </h3>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-lg font-bold text-white">
                    🗓️ Desarrollado en{" "}
                    {projects.find((p, i) => i === selectedProject)?.date}
                  </h3>
                  <div className="flex gap-2">
                    {projects
                      .find((p, i) => i === selectedProject)
                      ?.technologies.map((tech, index) => (
                        <i className={`${tech} text-white text-xl`}></i>
                      ))}
                  </div>
                </div>
                <hr className="border-t-2 border-white/50 my-4" />
                <p className="text-white text-lg">
                  {projects.find((p, i) => i === selectedProject)?.description}
                </p>
              </div>
            </div>

            <div
              className="mb-18"
              dangerouslySetInnerHTML={{
                __html: projects.find((exp, index) => index === selectedProject)
                  ?.content,
              }}
            ></div>

            <div
              onClick={() =>
                window.open(
                  projects.find((p, i) => i === selectedProject)?.link,
                  "_blank"
                )
              }
              className="hover:bg-green-500 hover:text-white absolute bottom-6 left-6 flex items-center gap-2 bg-green-100 w-fit rounded-full px-3 py-2 text-black font-bold tracking-tighter border-2 border-green-500 transition-all duration-200"
            >
              Ver código
              <span
                className="devicon-github-plain"
                style={{ fontSize: "18px" }}
              ></span>
            </div>
          </div>
        </InViewSection>

        {/* Contact Section */}
        <InViewSection>
          <section id="Yassin" className="py-40">
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tighter">
              ☎️ Contacto
            </h2>
            <div className="relative max-w-6xl mx-auto text-center">
              <div className="flex flex-col items-center gap-12">
                <img
                  src="/yo.jpg"
                  alt="Yassin Pellicer Lamla"
                  className="absolute w-64 h-64 z-[-1] top-[-150] rounded-full object-cover border-white shadow-lg opacity-40 overflow-hidden"
                />
                <p className="sm:text-3xl bold mt-8 text-white">
                  Quieres más información o concertar una entrevista o cita
                  personalizada?{" "}
                  <span style={{ fontFamily: "Over the Rainbow" }}>
                    ¡No dudes en ponerte en contacto conmigo!{" "}
                  </span>
                  Aquí tienes mis datos de contacto.
                </p>
                <div className="flex flex-row items-center  flex-wrap justify-around gap-12">
                  {/* Social Links */}
                  <div className="flex justify-center space-x-6">
                    <a
                      href="https://github.com/Yassin-Pellicer"
                      target="_blank"
                      className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all hover:scale-110"
                    >
                      <Github className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/yassin-pellicer/"
                      target="_blank"
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
                  </div>
                </div>
              </div>
            </div>
          </section>
        </InViewSection>
      </section>

      {/* Footer */}
      <footer
        id="contacto"
        className="py-8 w-full bg-black/30 backdrop-blur-md border-t border-white/10"
      >
        <div className="flex flex-row max-w-6xl mx-auto text-center justify-between align-center items-center px-4">
          <p className="text-gray-400 sm:text-md text-xs hover:text-white transition duration-300">
            © Yassin Pellicer Lamla. Todos los derechos reservados.
          </p>
          <a
            href="mailto:yassinpellicerlamla@gmail.com"
            className="text-gray-400 hover:text-white sm:text-md text-xs transition duration-300"
          >
            Contacto
          </a>
        </div>
      </footer>
    </div>
  );
}

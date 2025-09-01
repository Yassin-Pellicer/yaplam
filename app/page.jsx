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
import { AbsCerts } from "./components/abs&certs";
import { Projects } from "./components/projects";



export default function Portfolio() {

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
          <AbsCerts></AbsCerts>
        </InViewSection>

        {/* Projects Section */}
        <InViewSection>
          <Projects></Projects>
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

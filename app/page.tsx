"use client";
import "./lib/18n";

import "devicon/devicon.min.css";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { InViewSection } from "./components/motion";
import { About } from "./components/about";
import { Experience } from "./components/experience";
import { AbsCerts } from "./components/abs&certs";
import Projects from "./components/projects";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { LatestOnBlog } from "./components/lastOnBlog";


export default function Portfolio() {
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

        <InViewSection>
          <AbsCerts></AbsCerts>
        </InViewSection>

        <InViewSection>
          <Projects></Projects>
        </InViewSection>

        <InViewSection>
          <LatestOnBlog></LatestOnBlog>
        </InViewSection>

        <InViewSection>
          <Contact></Contact>
        </InViewSection>
      </section>
      <Footer style="black"></Footer>
    </div>
  );
}

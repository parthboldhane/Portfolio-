"use client";

import { useState } from "react";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { Skills } from "@/components/portfolio/skills";
import { Projects } from "@/components/portfolio/projects";
import { AIRefiner } from "@/components/portfolio/ai-tool-refiner";
import { AIBioGenerator } from "@/components/portfolio/ai-bio-generator";
import { Contact } from "@/components/portfolio/contact";
import { ScrollingCompanion } from "@/components/portfolio/scrolling-companion";
import { initialPortfolioData } from "@/lib/portfolio-data";

export default function Home() {
  const [data] = useState(initialPortfolioData);

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <Hero data={data} />
      <Skills skills={data.skills} />
      <AIBioGenerator />
      <Projects projects={data.projects} />
      <AIRefiner />
      <Contact data={data} />
      <ScrollingCompanion />
    </main>
  );
}

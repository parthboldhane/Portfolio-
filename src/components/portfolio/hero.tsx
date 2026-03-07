
"use client";

import { useState, useEffect } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, ArrowRight, Terminal, Activity } from "lucide-react";
import type { PortfolioData } from "@/lib/portfolio-data";

export function Hero({ data }: { data: PortfolioData }) {
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile-pic');
  const [terminalText, setTerminalText] = useState("");
  const fullText = `> parth_boldhane --init\n> status: active\n> role: firebase_expert\n> loc: nagpur, in\n> loading_arsenal... 100%`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/30 rounded-full neon-text-primary animate-pulse">
              {data.role}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent">
              <Activity className="w-3 h-3 animate-ping" />
              SYSTEM STATUS: OPEN_TO_PROJECTS
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none italic group">
            PARTH <span className="text-primary neon-text-primary hover-glitch inline-block">BOLDHANE</span>
          </h1>
          
          <div className="bg-black/80 border border-primary/20 p-4 rounded-none mb-8 font-mono text-sm md:text-base text-primary/80 neon-border max-w-md mx-auto md:mx-0">
            <div className="flex items-center justify-between mb-2 border-b border-primary/10 pb-1">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold">System Console v1.0.4</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              </div>
            </div>
            <div className="whitespace-pre-line leading-relaxed h-[100px]">
              {terminalText}
              <span className="terminal-cursor"></span>
            </div>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl font-medium">
            {data.bio}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Button size="lg" className="rounded-none gap-2 px-8 bg-primary text-black hover:bg-primary/80 font-bold uppercase tracking-widest neon-border" asChild>
              <a href="#projects">Access Files <ArrowRight className="w-4 h-4" /></a>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-black neon-border" asChild>
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5" /></a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-black neon-border" asChild>
                <a href={`mailto:${data.email}`}><Mail className="w-5 h-5" /></a>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto group">
            <div className="absolute inset-0 bg-primary/20 rounded-none rotate-3 group-hover:rotate-6 transition-transform neon-border"></div>
            <div className="absolute inset-0 bg-accent/20 rounded-none -rotate-3 group-hover:-rotate-6 transition-transform border border-accent/50"></div>
            <div className="relative w-full h-full overflow-hidden border-2 border-primary/50 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <Image
                src={profileImage?.imageUrl || "https://picsum.photos/seed/parth/400/400"}
                alt={data.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                data-ai-hint="professional portrait"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 -skew-y-12"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
    </section>
  );
}

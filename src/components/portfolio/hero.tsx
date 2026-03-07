"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, ArrowRight } from "lucide-react";
import type { PortfolioData } from "@/lib/portfolio-data";

export function Hero({ data }: { data: PortfolioData }) {
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile-pic');

  return (
    <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/30 rounded-full neon-text-primary">
            {data.role}
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none italic">
            PARTH <span className="text-primary neon-text-primary">BOLDHANE</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl font-medium">
            {data.bio}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Button size="lg" className="rounded-none gap-2 px-8 bg-primary text-black hover:bg-primary/80 font-bold uppercase tracking-widest neon-border" asChild>
              <a href="#projects">Work <ArrowRight className="w-4 h-4" /></a>
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
            <div className="relative w-full h-full overflow-hidden border-2 border-primary/50 grayscale hover:grayscale-0 transition-all duration-500">
              <Image
                src={profileImage?.imageUrl || "https://picsum.photos/seed/parth/400/400"}
                alt={data.name}
                fill
                className="object-cover"
                data-ai-hint="professional portrait"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 -skew-y-12"></div>
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-accent/5 rounded-full blur-[100px]"></div>
    </section>
  );
}
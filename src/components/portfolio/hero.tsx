
"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, ArrowRight } from "lucide-react";
import type { PortfolioData } from "@/lib/portfolio-data";

export function Hero({ data }: { data: PortfolioData }) {
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile-pic');

  return (
    <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-32 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wide text-secondary-foreground uppercase bg-secondary rounded-full">
            {data.role}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Hi, I'm <span className="text-primary">{data.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            {data.bio}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Button size="lg" className="rounded-full gap-2 px-8" asChild>
              <a href="#projects">View Projects <ArrowRight className="w-4 h-4" /></a>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary" asChild>
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5" /></a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary" asChild>
                <a href={`mailto:${data.email}`}><Mail className="w-5 h-5" /></a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary" asChild>
                <a href={`tel:${data.phone}`}><Phone className="w-5 h-5" /></a>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-110 animate-pulse"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
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
    </section>
  );
}

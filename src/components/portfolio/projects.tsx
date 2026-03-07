"use client";

import Image from "next/image";
import type { Experience } from "@/lib/portfolio-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export function Projects({ projects }: { projects: Experience[] }) {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
              SELECTED <span className="text-accent neon-text-accent">PROJECTS</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg font-medium">
              High-performance web solutions built with cutting-edge tech.
            </p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent hidden md:block mx-8 mb-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <Card key={project.id} className="group overflow-hidden rounded-none border border-white/10 bg-black/40 backdrop-blur-sm hover:border-accent/50 transition-all duration-500 neon-border-accent/0 hover:neon-border-accent">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.imageUrl || `https://picsum.photos/seed/${project.id}/600/400`}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  data-ai-hint="software project"
                />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-black/80 p-4 border border-accent/50 shadow-2xl">
                      <ExternalLink className="w-8 h-8 text-accent animate-pulse" />
                   </div>
                </div>
              </div>
              <CardHeader className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="rounded-none border-accent/50 text-accent uppercase font-bold tracking-widest text-[10px]">
                    {project.role}
                  </Badge>
                </div>
                <CardTitle className="text-3xl font-black tracking-tighter mb-4 italic group-hover:text-accent transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed font-medium">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-0">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-bold text-accent/70 uppercase tracking-widest">
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
    </section>
  );
}
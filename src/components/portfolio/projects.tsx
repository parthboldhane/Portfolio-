
"use client";

import Image from "next/image";
import type { Experience } from "@/lib/portfolio-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export function Projects({ projects }: { projects: Experience[] }) {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected Work</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            A showcase of my recent coding projects and professional experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <Card key={project.id} className="group overflow-hidden border-none bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.imageUrl || `https://picsum.photos/seed/${project.id}/600/400`}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint="software project"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white/90 p-3 rounded-full shadow-lg">
                      <ExternalLink className="w-6 h-6 text-primary" />
                   </div>
                </div>
              </div>
              <CardHeader className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-secondary/50 text-primary hover:bg-secondary/50">
                    {project.role}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold mb-3">{project.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-0">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t}{i < project.tech.length - 1 ? ' • ' : ''}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

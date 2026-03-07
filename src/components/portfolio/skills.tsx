
"use client";

import type { Skill } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Zap, Layout, Laptop } from "lucide-react";

export function Skills({ skills }: { skills: Skill[] }) {
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "expertise": return <Zap className="w-5 h-5 text-accent" />;
      case "languages": return <Code2 className="w-5 h-5 text-accent" />;
      case "tools": return <Laptop className="w-5 h-5 text-accent" />;
      default: return <Layout className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Arsenal</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Technologies and tools I leverage to build modern software solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                {getIcon(skill.category)}
                <CardTitle className="text-xl">{skill.category}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 pt-4">
                {skill.items.map((item, i) => (
                  <Badge key={i} variant="outline" className="text-sm py-1 px-3 bg-white hover:bg-primary hover:text-white transition-colors cursor-default">
                    {item}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


"use client";

import { initialPortfolioData, type Skill } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Zap, Layout, Laptop } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

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
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
            TECHNICAL <span className="text-primary neon-text-primary">ARSENAL</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg font-medium">
            Core systems and linguistic protocols integrated into the neural network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radar Chart Column */}
          <div className="lg:col-span-5 h-[400px] bg-black/40 border border-white/5 backdrop-blur-sm neon-border-accent/20 p-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-accent mb-4 px-4">Expertise Protocol</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={initialPortfolioData.skillMetrics}>
                <PolarGrid stroke="hsla(var(--primary), 0.2)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: 'hsla(var(--foreground), 0.6)', fontSize: 10, fontWeight: 900 }} 
                />
                <Radar
                  name="Parth"
                  dataKey="A"
                  stroke="hsla(var(--primary), 1)"
                  fill="hsla(var(--primary), 0.3)"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Skills Column */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10 rounded-none hover:bg-white/10 transition-all group">
                <CardHeader className="flex flex-row items-center gap-3 pb-2 space-y-0">
                  <div className="p-2 bg-primary/10 rounded-none group-hover:bg-primary/20 transition-colors">
                    {getIcon(skill.category)}
                  </div>
                  <CardTitle className="text-sm font-black uppercase tracking-widest">{skill.category}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 pt-4">
                  {skill.items.map((item, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="rounded-none border-primary/20 text-[10px] font-bold py-1 px-3 bg-transparent hover:bg-primary hover:text-black transition-colors cursor-default uppercase tracking-tighter"
                    >
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-primary/5 blur-[120px] skew-x-12 translate-x-1/2"></div>
    </section>
  );
}

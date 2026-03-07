
"use client";

import type { PortfolioData } from "@/lib/portfolio-data";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact({ data }: { data: PortfolioData }) {
  return (
    <footer id="contact" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Get In Touch</h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-12 text-lg">
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center gap-4 p-8 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
            <Mail className="w-8 h-8" />
            <h3 className="font-semibold text-xl">Email</h3>
            <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>
          </div>
          <div className="flex flex-col items-center gap-4 p-8 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
            <Phone className="w-8 h-8" />
            <h3 className="font-semibold text-xl">Phone</h3>
            <a href={`tel:${data.phone}`} className="hover:underline">{data.phone}</a>
          </div>
          <div className="flex flex-col items-center gap-4 p-8 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
            <Linkedin className="w-8 h-8" />
            <h3 className="font-semibold text-xl">LinkedIn</h3>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">parth-boldhane</a>
          </div>
        </div>

        <div className="border-t border-white/20 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold tracking-tighter">BoldFolio</div>
          <div className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Parth Boldhane. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-primary-foreground/80 italic">
            <MapPin className="w-4 h-4" /> Jhulelal Institute of Technology
          </div>
        </div>
      </div>
    </footer>
  );
}

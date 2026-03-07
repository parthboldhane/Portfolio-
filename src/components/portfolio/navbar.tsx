"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Arsenal", href: "#skills" },
    { name: "Work", href: "#projects" },
    { name: "AI", href: "#ai-refiner" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4",
      isScrolled ? "py-4 bg-black/90 backdrop-blur-xl border-b border-primary/20" : "py-8 bg-transparent"
    )}>
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter text-primary italic neon-text-primary">
          BOLDFOLIO<span className="text-white">.SYS</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase font-black tracking-[0.2em] hover:text-primary transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-black font-bold uppercase tracking-widest neon-border">
            Connect
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        "md:hidden fixed inset-0 top-0 bg-black z-40 transition-transform duration-500 ease-in-out p-8 flex flex-col justify-center",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-4xl font-black italic uppercase tracking-tighter hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button className="rounded-none w-full py-8 text-xl font-black uppercase tracking-widest bg-primary text-black">
            Connect Now
          </Button>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-primary"
        >
          <X size={40} />
        </button>
      </div>
    </nav>
  );
}
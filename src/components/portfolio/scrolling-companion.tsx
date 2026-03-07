
"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export function ScrollingCompanion() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [isScared, setIsScared] = useState(false);
  const [scaredOffset, setScaredOffset] = useState({ x: 0, y: 0 });
  
  let scrollTimeout: NodeJS.Timeout;

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 200);

      const sections = ["home", "skills", "projects", "ai-refiner", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScare = () => {
    if (isScared) return;
    setIsScared(true);
    
    // Random jump logic
    const jumpX = (Math.random() - 0.5) * 400; // Jump -200 to 200px
    const jumpY = -Math.random() * 100 - 50;   // Jump up 50-150px
    setScaredOffset({ x: jumpX, y: jumpY });
    
    // Return after a delay
    setTimeout(() => {
      setIsScared(false);
      setScaredOffset({ x: 0, y: 0 });
    }, 1500);
  };

  const message = useMemo(() => {
    if (isScared) return "NO TOUCHY!! EEK!";
    if (!isScrolling) return "Zzz... (click me?)";
    switch (currentSection) {
      case "home": return "Ready for takeoff!";
      case "skills": return "Checking the arsenal...";
      case "projects": return "Wow, cool work!";
      case "ai-refiner": return "Beep boop, refining!";
      case "contact": return "Let's connect!";
      default: return "Exploring...";
    }
  }, [currentSection, isScrolling, isScared]);

  return (
    <div 
      className="fixed z-[100] transition-all duration-500 ease-out hidden md:block cursor-pointer"
      style={{
        bottom: "40px",
        left: `${scrollProgress * 0.9}%`,
        transform: `translate(${scaredOffset.x}px, ${scaredOffset.y}px)`,
      }}
      onMouseEnter={handleScare}
      onClick={handleScare}
    >
      <div className={cn(
        "relative transition-transform duration-200",
        isScrolling || isScared ? "animate-dog-walk" : "",
        isScared ? "scale-125 brightness-150" : "scale-100"
      )}>
        <svg 
          width="70" 
          height="70" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-colors duration-300",
            isScared ? "text-accent" : "text-primary"
          )}
        >
          <path 
            d="M5 11C4 10 3 11 3 13C3 15 5 15 5 15" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            className={cn("origin-right", (isScrolling || isScared) ? "animate-tail-wag" : "")}
          />
          <path 
            d="M8 5V3C8 2.44772 8.44772 2 9 2H10C10.5523 2 11 2.44772 11 3V5M16 5V3C16 2.44772 16.4477 2 17 2H18C18.5523 2 19 2.44772 19 3V5M5 11C5 8.79086 6.79086 7 9 7H15C17.2091 7 19 8.79086 19 11V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V11ZM7 22V19M11 22V19M13 22V19M17 22V19" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <g className="animate-blink">
            <circle cx="9" cy="11" r="1" fill="currentColor" />
            <circle cx="15" cy="11" r="1" fill="currentColor" />
          </g>
          <path d="M11 14H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
        
        <div className={cn(
          "absolute -top-12 left-1/2 -translate-x-1/2 backdrop-blur-md border text-[10px] px-3 py-1.5 rounded-none whitespace-nowrap font-black uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300",
          (isScrolling || isScared) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          isScared ? "bg-accent/80 border-white text-white" : "bg-black/60 border-primary/50 text-primary"
        )}>
          {message}
          <div className={cn(
            "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-r border-b rotate-45",
            isScared ? "bg-accent/80 border-white" : "bg-black/60 border-primary/50"
          )}></div>
        </div>
      </div>
    </div>
  );
}

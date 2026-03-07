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

      const sections = ["home", "skills", "projects", "ai-bio", "ai-refiner", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust detection to be more accurate as we scroll past the mid-point
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
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
    
    // Random jump logic: moves further away and jumps higher
    const jumpX = (Math.random() - 0.5) * 600; 
    const jumpY = -Math.random() * 150 - 100;  
    setScaredOffset({ x: jumpX, y: jumpY });
    
    // Return after a delay with a "reset" feel
    setTimeout(() => {
      setIsScared(false);
      setScaredOffset({ x: 0, y: 0 });
    }, 2000);
  };

  const message = useMemo(() => {
    if (isScared) return "SYSTEM ERROR: UNKNOWN CONTACT! ABORT!!";
    
    if (!isScrolling) {
      switch (currentSection) {
        case "home": return "Uplink established at the Home base.";
        case "skills": return "Standing guard by the Tech Arsenal.";
        case "ai-bio": return "Waiting for your AI identity to compile.";
        case "projects": return "Analyzing the project archives...";
        case "ai-refiner": return "Synthesizing data in the AI Lab.";
        case "contact": return "Secure transmission line ready.";
        default: return "Awaiting next command...";
      }
    }

    switch (currentSection) {
      case "home": return "Welcome to the Neural Core! Parth's main uplink is here.";
      case "skills": return "Scanning the Tech Arsenal... 99% Firebase compatibility detected.";
      case "ai-bio": return "Neural Network Identity Architect: Crafting your bio protocols.";
      case "projects": return "Entering the Project Vault. These systems are fully operational.";
      case "ai-refiner": return "AI Lab active. Let's optimize some data protocols!";
      case "contact": return "Uplink terminal reached. Direct transmission available.";
      default: return "Navigating through the system layers...";
    }
  }, [currentSection, isScrolling, isScared]);

  return (
    <div 
      className="fixed z-[100] transition-all duration-700 ease-out hidden md:block cursor-pointer"
      style={{
        bottom: "60px",
        left: `${scrollProgress * 0.9}%`,
        transform: `translate(${scaredOffset.x}px, ${scaredOffset.y}px)`,
      }}
      onMouseEnter={handleScare}
      onClick={handleScare}
    >
      <div className={cn(
        "relative transition-transform duration-300",
        (isScrolling || isScared) ? "animate-dog-walk" : "",
        isScared ? "scale-150 rotate-12 brightness-200" : "scale-100"
      )}>
        {/* Neon Dog SVG */}
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "drop-shadow-[0_0_15px_rgba(34,211,238,0.9)] transition-colors duration-500",
            isScared ? "text-accent" : "text-primary"
          )}
        >
          {/* Tail */}
          <path 
            d="M5 11C4 10 3 11 3 13C3 15 5 15 5 15" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            className={cn("origin-right", (isScrolling || isScared) ? "animate-tail-wag" : "")}
          />
          {/* Body and Head */}
          <path 
            d="M8 5V3C8 2.44772 8.44772 2 9 2H10C10.5523 2 11 2.44772 11 3V5M16 5V3C16 2.44772 16.4477 2 17 2H18C18.5523 2 19 2.44772 19 3V5M5 11C5 8.79086 6.79086 7 9 7H15C17.2091 7 19 8.79086 19 11V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V11ZM7 22V19M11 22V19M13 22V19M17 22V19" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          {/* Eyes with blinking */}
          <g className="animate-blink">
            <circle cx="9" cy="11" r="1" fill="currentColor" />
            <circle cx="15" cy="11" r="1" fill="currentColor" />
          </g>
          {/* Mouth */}
          <path d="M11 14H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
        
        {/* Floating Speech Bubble */}
        <div className={cn(
          "absolute -top-16 left-1/2 -translate-x-1/2 backdrop-blur-xl border text-[11px] px-4 py-2 rounded-sm whitespace-nowrap font-black uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-500",
          (isScrolling || isScared || !isScrolling) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          isScared 
            ? "bg-destructive border-white text-white animate-bounce" 
            : "bg-black/80 border-primary/60 text-primary"
        )}>
          <div className="flex items-center gap-2">
            {!isScared && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
            {message}
          </div>
          {/* Pointer */}
          <div className={cn(
            "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border-r border-b rotate-45",
            isScared ? "bg-destructive border-white" : "bg-black/80 border-primary/60"
          )}></div>
        </div>
      </div>
    </div>
  );
}

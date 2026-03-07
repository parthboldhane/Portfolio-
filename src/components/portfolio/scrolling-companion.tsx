"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ScrollingCompanion() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  let scrollTimeout: NodeJS.Timeout;

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="fixed z-50 pointer-events-none transition-all duration-300 ease-out hidden md:block"
      style={{
        bottom: "40px",
        left: `${scrollProgress * 0.9}%`,
        transform: `translateX(20px)`,
      }}
    >
      <div className={cn(
        "relative transition-transform duration-200",
        isScrolling ? "animate-dog-walk" : ""
      )}>
        {/* Neon Dog SVG */}
        <svg 
          width="60" 
          height="60" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        >
          <path 
            d="M8 5V3C8 2.44772 8.44772 2 9 2H10C10.5523 2 11 2.44772 11 3V5M16 5V3C16 2.44772 16.4477 2 17 2H18C18.5523 2 19 2.44772 19 3V5M5 11C5 8.79086 6.79086 7 9 7H15C17.2091 7 19 8.79086 19 11V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V11ZM7 22V19M11 22V19M13 22V19M17 22V19" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
            className="text-primary"
          />
          <circle cx="9" cy="11" r="1" fill="currentColor" className="text-primary" />
          <circle cx="15" cy="11" r="1" fill="currentColor" className="text-primary" />
          <path d="M11 14H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-primary" />
        </svg>
        
        {/* Floating Bubble */}
        {isScrolling && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary/20 backdrop-blur-sm border border-primary/50 text-primary text-[10px] px-2 py-1 rounded-full whitespace-nowrap font-bold uppercase tracking-tighter">
            Let's Go!
          </div>
        )}
      </div>
    </div>
  );
}
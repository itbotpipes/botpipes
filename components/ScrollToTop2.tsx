"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Image from "next/image";

const ScrollProgressButton = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.round(percent)));
      
      setIsVisible(scrollTop > 300);
    };
    
    window.addEventListener("scroll", updateScroll);
    updateScroll();
    
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isComplete = progress >= 100;
  
  // Calculate valve rotation (0-360 degrees based on progress)
  const valveRotation = (progress / 100) * 360;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        w-20 h-20
        flex items-center justify-center
        transition-all duration-500 ease-out
        group
        cursor-pointer
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
      `}
      aria-label="Scroll to top"
    >
      
      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-full blur-xl transition-all duration-500
        ${isComplete 
          ? 'bg-gray-300/40' 
          : 'bg-[#24275E]/30 group-hover:bg-[#24275E]/40'
        }
      `} />

      {/* Outer valve ring */}
      <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-slate-700 via-slate-300 to-slate-900 shadow-2xl">
        
      </div>

      {/* Inner valve chamber (water container) */}
      <div className="absolute inset-3 rounded-full bg-slate-950 border-2 border-slate-700 overflow-hidden shadow-inner">
        <Image 
          src="/logo/BOTPIPES TECH/botpipes-progress-logo-two.png"
          fill
          alt="botpipes progress logo"
          className="z-20"
        />
        {/* Water fill animation */}
        <div 
          className="absolute bottom-0 left-0 w-full transition-all duration-500 ease-out"
          style={{
            height: `${progress}%`,
            background: isComplete 
              ? 'linear-gradient(to top, #a1a1a1, #b8b8b8, #fff)' 
              : 'linear-gradient(to top, #1e3a8a, #3b82f6, #60a5fa)',
          }}
        >
          {/* Water surface waves */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
            <div 
              className="absolute top-0 left-0 w-[200%] h-full opacity-40"
              style={{
                background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)',
                animation: 'wave 3s linear infinite',
              }}
            />
          </div>

          {/* Bubbles rising */}
          {progress > 0 && progress < 100 && (
            <>
              <div 
                className="absolute w-1.5 h-1.5 rounded-full bg-white/40 animate-bubble"
                style={{ 
                  left: '30%',
                  bottom: '10%',
                  animationDuration: '3s',
                  animationDelay: '0s'
                }}
              />
              <div 
                className="absolute w-1 h-1 rounded-full bg-white/30 animate-bubble"
                style={{ 
                  left: '60%',
                  bottom: '5%',
                  animationDuration: '4s',
                  animationDelay: '1s'
                }}
              />
              <div 
                className="absolute w-1 h-1 rounded-full bg-white/30 animate-bubble"
                style={{ 
                  left: '50%',
                  bottom: '15%',
                  animationDuration: '3.5s',
                  animationDelay: '2s'
                }}
              />
            </>
          )}

          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Rotating valve wheel (spins with scroll) */}
      {/* <div 
        className="absolute inset-4 flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotate(${valveRotation}deg)`,
        }}
      > */}
        {/* Valve spokes */}
        {/* <div className="relative w-full h-full">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-1.5 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 rounded-full shadow-lg" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-600 rounded-full shadow-lg" />
        </div>
      </div> */}

      {/* Center hub */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 shadow-xl border-2 border-slate-700 flex items-center justify-center z-10">
        <ArrowUp 
          size={14} 
          className={`
            transition-all duration-300
            ${isComplete ? 'text-green-400 scale-110' : 'text-blue-400'}
          `}
          style={{
            filter: isComplete 
              ? 'drop-shadow(0 0 4px rgba(74, 222, 128, 0.8))' 
              : 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))'
          }}
        />
      </div> */}

      {/* Percentage indicator */}
      {/* <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 rounded-full bg-slate-900 border border-slate-700 shadow-lg">
        <span className={`
          text-[10px] font-inter font-bold tracking-wider
          ${isComplete ? 'text-green-400' : 'text-blue-400'}
        `}>
          {progress}%
        </span>
      </div> */}

      {/* Overflow indicator (when full) */}
      {isComplete && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-200/60 animate-ping" />
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white" />
        </>
      )}

      {/* Press effect */}
      <div className="absolute inset-0 rounded-full scale-100 group-active:scale-95 transition-transform duration-100" />

      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes bubble {
          0% { 
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% { 
            transform: translateY(-60px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }
      `}</style>
    </button>
  );
};

export default ScrollProgressButton;
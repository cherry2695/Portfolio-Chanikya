import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface DevLoaderProps {
  onComplete: () => void;
}

type LoaderStage = "terminal" | "circle" | "complete";

export default function DevLoader({ onComplete }: DevLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [stage, setStage] = useState<LoaderStage>("terminal");
  const [circleProgress, setCircleProgress] = useState(0);
  const [isZoomingOut, setIsZoomingOut] = useState(false);

  const logs = [
    { text: "vite v5.4.10 ready in 150ms // node version: v20.12.0", delay: 100 },
    { text: "compiling entry points: src/main.tsx, tailwindcss, react-router...", delay: 400 },
    { text: "rendering React components & hydrating virtual DOM...", delay: 750 },
    { text: "optimizing asset bundles: Wanderlust, Campus Connect, PuffyPad...", delay: 1100 },
    { text: "production bundle size optimized: 142.6 kB (gzipped)...", delay: 1400 },
    { text: "server boot finished. Listening on http://localhost:3010", delay: 1700 },
  ];

  // Stage 1: Terminal Progress
  useEffect(() => {
    if (stage !== "terminal") return;

    const totalDuration = 1800; // 1.8 seconds total load
    const intervalTime = 25;
    const steps = totalDuration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [stage]);

  // Cycle through log lines based on time delays
  useEffect(() => {
    if (stage !== "terminal") return;

    const timeouts = logs.map((log, index) => {
      return setTimeout(() => {
        setCurrentLine(index);
      }, log.delay);
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [stage]);

  // Transition to Circle Stage
  useEffect(() => {
    if (progress === 100 && stage === "terminal") {
      const timeout = setTimeout(() => {
        setStage("circle");
      }, 500); // reduced from 1200 to 500
      return () => clearTimeout(timeout);
    }
  }, [progress, stage]);

  // Stage 2: Circle Progress Counter
  useEffect(() => {
    if (stage !== "circle") return;

    const totalDuration = 1000; // 1 second circular animation
    const intervalTime = 20;
    const steps = totalDuration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCircleProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [stage]);

  // Finish and open website
  useEffect(() => {
    if (circleProgress === 100 && stage === "circle") {
      const timeout = setTimeout(() => {
        setIsZoomingOut(true);
        const completeTimeout = setTimeout(() => {
          setStage("complete");
          const onCompleteTimeout = setTimeout(() => {
            onComplete();
          }, 600); // Allow exit scale-out & blur on dev-loader-screen to finish
          return () => clearTimeout(onCompleteTimeout);
        }, 500); // 500ms for circle zoom out transition
        return () => clearTimeout(completeTimeout);
      }, 400); // Let the 100% load settle for 400ms
      return () => clearTimeout(timeout);
    }
  }, [circleProgress, stage, onComplete]);

  // State for responsive bar length
  const [barLength, setBarLength] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setBarLength(50);
      } else {
        setBarLength(30);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate bar
  const headIndex = Math.min(Math.floor((progress / 100) * barLength), barLength - 1);
  let barContent = "";
  for (let i = 0; i < barLength; i++) {
    if (i < headIndex) {
      barContent += "=";
    } else if (i === headIndex) {
      barContent += ">";
    } else {
      barContent += " ";
    }
  }
  const barText = "[" + barContent + "]";

  // Radial configurations
  const radius = 50;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circleProgress / 100) * circumference;

  return (
    <AnimatePresence mode="wait">
      {stage !== "complete" && (
        <motion.div
          id="dev-loader-screen"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-[#020202] z-[9999] flex flex-col justify-between p-6 sm:p-12 font-mono text-[11px] sm:text-xs text-white/40 selection:bg-[#FF3E00]/20 selection:text-[#FF3E00]"
        >
          {/* Top Bar Status */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF3E00] animate-pulse" />
              <span className="text-white/80 font-semibold tracking-wider">A.CHANIKYA // PORTFOLIO</span>
            </div>
            <div className="text-right text-[10px] text-white/30 hidden sm:block">
              SYSTEM_INIT_OK // PORT_3010
            </div>
          </div>

          {/* Central Stage Switcher */}
          <div className="flex-grow flex flex-col justify-center items-center max-w-2xl mx-auto w-full my-8">
            <AnimatePresence mode="wait">
              {stage === "terminal" ? (
                <motion.div
                  key="terminal-panel"
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="bg-black/40 border border-white/5 p-6 sm:p-8 rounded-lg shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col gap-6 w-full"
                >
                  {/* Terminal Header */}
                  <div className="flex justify-between items-center text-[10px] text-white/30 border-b border-white/5 pb-3">
                    <span>CHANIKYA_CORE_VM_V3.5.sh</span>
                    <span>shell</span>
                  </div>

                  {/* Code logs container */}
                  <div className="space-y-2.5 min-h-[140px] flex flex-col justify-end">
                    {logs.slice(0, currentLine + 1).map((log, idx) => {
                      const isLast = idx === currentLine;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex items-start gap-2.5 ${
                            isLast ? "text-white" : "text-white/45"
                          }`}
                        >
                          <span className="text-[#FF3E00]/80 shrink-0">❯</span>
                          <span className="leading-relaxed">
                            {log.text}
                            {isLast && progress < 100 && (
                              <span className="inline-block w-1.5 h-3.5 bg-[#FF3E00] ml-1.5 animate-pulse align-middle" />
                            )}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Progress Panel */}
                  <div className="border-t border-white/5 pt-5 mt-2 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-white/70">
                      <span className="tracking-wider text-white font-semibold">BOOT SEQUENCE</span>
                      <span className="text-[#FF3E00] font-bold text-right">{Math.round(progress)}%</span>
                    </div>
                    
                    {/* Visual loading bar */}
                    <div className="flex items-center w-full font-mono text-xs sm:text-sm text-[#FF3E00] font-bold select-none h-6">
                      <span className="mr-1 sm:mr-1.5">[</span>
                      <div className="flex-grow relative overflow-hidden h-full flex items-center">
                        {/* Faint background pattern of dots to represent the track */}
                        <div className="absolute inset-0 text-white/5 whitespace-nowrap overflow-hidden select-none tracking-tight flex items-center">
                          {".".repeat(300)}
                        </div>
                        {/* The progress bar made of '=' and ending with '>' */}
                        <div className="absolute inset-0 flex items-center">
                          <div 
                            className="relative h-full flex items-center overflow-hidden pr-3"
                            style={{ width: `${progress}%` }}
                          >
                            <span className="text-[#FF3E00] font-bold whitespace-nowrap">
                              {"=".repeat(300)}
                            </span>
                            <span className="absolute right-0 text-[#FF3E00] font-extrabold bg-[#020202] pl-0.5">&gt;</span>
                          </div>
                        </div>
                      </div>
                      <span className="ml-1 sm:ml-1.5">]</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="circle-panel"
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ 
                    opacity: isZoomingOut ? 0 : 1, 
                    scale: isZoomingOut ? 0.3 : 1, 
                    y: isZoomingOut ? -15 : 0,
                    filter: isZoomingOut ? "blur(12px)" : "blur(0px)"
                  }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center gap-8 text-center"
                >
                  {/* Glowing Circular Loader Container */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* Background faint pulse ring */}
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse" />
                    
                    {/* Constant spinning dash border */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                      className="absolute inset-2 rounded-full border border-dashed border-[#FF3E00]/20"
                    />

                    {/* SVG Radial Progress Ring */}
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Base ring */}
                      <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        className="stroke-white/5 fill-none"
                        strokeWidth={strokeWidth}
                      />
                      {/* Active glowing progressive ring */}
                      <motion.circle
                        cx="72"
                        cy="72"
                        r={radius}
                        className="stroke-[#FF3E00] fill-none"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                          filter: "drop-shadow(0 0 6px rgba(255, 62, 0, 0.6))",
                        }}
                      />
                    </svg>

                    {/* Central percentage counter */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tighter">
                        {Math.round(circleProgress)}%
                      </span>
                      <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1">
                        LOAD
                      </span>
                    </div>
                  </div>

                  {/* Status Texts under Loader */}
                  <div className="flex flex-col gap-2.5 max-w-sm">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="text-[#FF3E00] font-bold uppercase tracking-[3px] text-[10px] sm:text-xs"
                    >
                      Launching Secure Portal
                    </motion.div>
                    <div className="text-white/40 text-[10px] sm:text-[11px] leading-relaxed font-mono">
                      Establishing core UI layers, hydrating DOM branches, and preparing final viewports...
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Bar Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-white/5 pt-4 text-[10px] text-white/20">
            <div>
              &copy; 2026 CHANIKYA AMANCHA. ALL SYSTEMS OPERATIONAL.
            </div>
            <div className="flex gap-4">
              <span>LOC: HYDERABAD, IN</span>
              <span>EST: 2026-06-30</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

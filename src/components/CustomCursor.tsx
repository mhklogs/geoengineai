import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverData, setHoverData] = useState<{ title: string; desc?: string; action?: string } | null>(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if the device is a mobile or touch screen
    const isTouch = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for the furthest/highest ancestor with data-cursor-title/desc in the DOM tree, up to body
      let hoverable: HTMLElement | null = null;
      let curr: HTMLElement | null = target;
      
      while (curr && curr !== document.body) {
        if (curr.hasAttribute("data-cursor-title") || curr.hasAttribute("data-cursor-desc") || curr.hasAttribute("data-cursor-action")) {
          hoverable = curr; // Prefer the highest wrapper container with explicit data-cursor configuration
        }
        curr = curr.parentElement;
      }
      
      // If no custom data-cursor parent found, fallback to standard interactive elements closest to the target
      if (!hoverable) {
        hoverable = target.closest("button, a, [role='button']") as HTMLElement | null;
      }
      
      if (hoverable) {
        setIsHoveringInteractive(true);
        const title = hoverable.getAttribute("data-cursor-title") || "";
        const desc = hoverable.getAttribute("data-cursor-desc") || "";
        const action = hoverable.getAttribute("data-cursor-action") || "";

        if (title || desc || action) {
          setHoverData({ title, desc, action });
        } else {
          setHoverData(null);
        }
      } else {
        setIsHoveringInteractive(false);
        setHoverData(null);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHoveringInteractive ? 1.4 : 1,
          borderColor: hoverData ? "rgba(56, 189, 248, 0.7)" : "rgba(125, 211, 252, 0.4)",
          backgroundColor: hoverData ? "rgba(56, 189, 248, 0.05)" : "rgba(125, 211, 252, 0.02)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />

      {/* Inner Pinpoint Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          backgroundColor: hoverData ? "#38bdf8" : "#7dd3fc",
          boxShadow: hoverData 
            ? "0 0 12px rgba(56, 189, 248, 0.9)" 
            : "0 0 10px rgba(125, 211, 252, 0.8)",
        }}
      />

      {/* Floating Holographic Tooltip */}
      {hoverData && (
        <motion.div
          className="fixed top-0 left-0 ml-6 mt-6 pointer-events-none z-[9998] min-w-[220px] max-w-[280px]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="bg-[#040812]/95 backdrop-blur-xl border border-sky-500/20 rounded-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Top scanning lines effect */}
            <div className="absolute inset-0 pixis-grid-lines opacity-10 pointer-events-none"></div>
            
            {/* Ambient titanium & ice blue gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-slate-200 via-sky-400 to-sky-600"></div>

            {hoverData.action && (
              <span className="text-[8px] font-mono text-sky-400 font-extrabold uppercase tracking-[0.2em] block mb-1.5">
                // {hoverData.action}
              </span>
            )}
            
            {hoverData.title && (
              <h4 className="text-[11px] font-bold text-white font-mono tracking-wide leading-tight">
                {hoverData.title}
              </h4>
            )}
            
            {hoverData.desc && (
              <p className="text-[10px] text-slate-300 font-sans mt-2 leading-relaxed">
                {hoverData.desc}
              </p>
            )}

            {/* Micro-tech scan line detail */}
            <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[8px] font-mono text-slate-400">
              <span>SCANNING PARITY...</span>
              <span className="text-sky-400">● STABLE</span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

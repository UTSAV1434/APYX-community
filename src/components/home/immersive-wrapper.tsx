"use client";

import React, { useRef, useEffect } from "react";
import { useScroll, useSpring } from "framer-motion";

interface ImmersiveWrapperProps {
  children: React.ReactNode;
}

export function ImmersiveWrapper({ children }: ImmersiveWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track the scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth the scroll progress so the video doesn't jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the video is paused initially
    video.pause();

    const unsubscribe = smoothProgress.on("change", (latest) => {
      // Map scroll progress (0 to 1) to video duration
      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = latest * video.duration;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [smoothProgress]);

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky background that stays in viewport while scrolling through the container */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            ref={videoRef}
            src="/apyx-homepage.mp4"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-100"
            playsInline
            muted
            preload="auto"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>
      </div>

      {/* Top/Bottom gradient blending for seamless transitions to hero/footer */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-0" />

      {/* Children content (the sections) */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

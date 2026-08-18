/**
 * CinematicBackground — Decorative fullscreen video backdrop
 *
 * Architecture:
 *   - Purely decorative (aria-hidden, pointer-events: none)
 *   - Autoplay, muted, loop, playsInline
 *   - Respects prefers-reduced-motion via ExperienceProvider
 *   - Fades in after load to avoid flash of black
 *   - Falls back to poster image on error or reduced-motion
 *   - Uses faststart MP4 for progressive streaming
 *
 * Layer position: z-0 (behind everything else in the Hero)
 */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useExperience } from "@/components/ui/experience/experience-provider";
import { cn } from "@/lib/utils";

interface CinematicBackgroundProps {
  /** Path to the optimized MP4 (no audio, faststart) */
  src: string;
  /** Path to the poster/fallback image */
  poster: string;
  /** Additional className for the container */
  className?: string;
  /** Overlay opacity — controls the dark cinematic overlay (0–1). Default: 0.55 */
  overlayOpacity?: number;
  /** Variant for the vignette. "hero" has a left-to-right gradient, "centered" has a uniform/radial gradient. */
  variant?: "hero" | "centered";
}

export function CinematicBackground({
  src,
  poster,
  className,
  overlayOpacity = 0.55,
  variant = "hero",
}: CinematicBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { reducedMotion } = useExperience();
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Whether to attempt playing the video at all
  const shouldPlayVideo = !reducedMotion && !videoError;

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
  }, []);

  const handleError = useCallback(() => {
    setVideoError(true);
    setVideoReady(false);
  }, []);

  // Pause/play based on reduced-motion changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
    } else if (!videoError) {
      // Attempt to play — browsers may block, which is fine (poster shows)
      video.play().catch(() => {
        // Autoplay blocked — poster image will remain visible
      });
    }
  }, [reducedMotion, videoError]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* 1. Video layer */}
      {shouldPlayVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onCanPlay={handleCanPlay}
          onError={handleError}
          className={cn(
            "absolute inset-0 w-full h-full object-cover",
            // Fade in once loaded to avoid flash
            "transition-opacity duration-1000 ease-out",
            videoReady ? "opacity-100" : "opacity-0"
          )}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* 2. Poster fallback — always present behind the video as a safety net.
           Visible when: video hasn't loaded yet, video errored, or reduced-motion. */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat",
          // Only fade out poster once video is confirmed playing
          "transition-opacity duration-1000 ease-out",
          videoReady && shouldPlayVideo ? "opacity-0" : "opacity-100"
        )}
        style={{ backgroundImage: `url(${poster})` }}
      />

      {/* 3. Dark cinematic overlay — base layer */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(5, 8, 22, ${overlayOpacity})` }}
      />

      {/* 4. Vignette depending on variant */}
      {variant === "hero" ? (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, rgba(5, 8, 22, 0.4) 0%, rgba(5, 8, 22, 0.15) 50%, rgba(5, 8, 22, 0) 100%)`,
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#0a0a0a]/60" />
      )}

      {/* 5. Bottom gradient — seamless blend into next section (only for hero) */}
      {variant === "hero" && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      )}
    </div>
  );
}

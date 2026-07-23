"use client";

import { useEffect, useRef, useState } from "react";

type YtPlayer = {
  playVideo: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: {
          videoId: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: () => void;
          };
        },
      ) => YtPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const VIDEO_ID = "dQw4w9WgXcQ";

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function PixelSpeaker({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
      className={className}
      shapeRendering="crispEdges"
    >
      <rect x="1" y="5" width="2" height="6" fill="currentColor" />
      <rect x="3" y="4" width="2" height="8" fill="currentColor" />
      <rect x="5" y="2" width="2" height="12" fill="currentColor" />
      <rect x="8" y="3" width="1" height="2" fill="currentColor" />
      <rect x="9" y="5" width="1" height="2" fill="currentColor" />
      <rect x="10" y="7" width="1" height="2" fill="currentColor" />
      <rect x="9" y="9" width="1" height="2" fill="currentColor" />
      <rect x="8" y="11" width="1" height="2" fill="currentColor" />
      <rect x="11" y="2" width="1" height="2" fill="currentColor" />
      <rect x="12" y="4" width="1" height="2" fill="currentColor" />
      <rect x="13" y="6" width="1" height="4" fill="currentColor" />
      <rect x="12" y="10" width="1" height="2" fill="currentColor" />
      <rect x="11" y="12" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const [phase, setPhase] = useState<"loading" | "ready" | "playing">("loading");
  const [progress, setProgress] = useState(0);
  const [action, setAction] = useState<"click" | "tap">("click");
  const playerRef = useRef<YtPlayer | null>(null);
  const playWhenReadyRef = useRef(false);
  const playerReadyRef = useRef(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;
    setAction(isTouch ? "tap" : "click");
  }, []);

  useEffect(() => {
    const createPlayer = () => {
      if (!hostRef.current || playerRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId: VIDEO_ID,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          controls: 1,
          fs: 1,
        },
        events: {
          onReady: () => {
            playerReadyRef.current = true;
            if (playWhenReadyRef.current) {
              playerRef.current?.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
      return;
    }

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      createPlayer();
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let value = 0;
    let frame = 0;

    const stallPoints = Array.from({ length: Math.floor(rand(2, 5)) }, () => ({
      at: rand(12, 88),
      until: 0,
      duration: rand(180, 900),
    })).sort((a, b) => a.at - b.at);

    const tick = () => {
      if (cancelled) return;

      for (const s of stallPoints) {
        if (s.until === 0 && value >= s.at) {
          s.until = performance.now() + s.duration;
          value = s.at;
          break;
        }
      }

      const stalled = stallPoints.find(
        (s) => s.until > 0 && performance.now() < s.until,
      );
      if (stalled) {
        setProgress(Math.floor(value));
        frame = window.setTimeout(tick, rand(70, 160));
        return;
      }

      const burst = Math.random() > 0.78;
      const crawl = Math.random() > 0.65;
      const step = burst ? rand(2.2, 6.5) : crawl ? rand(0.12, 0.5) : rand(0.55, 2.0);

      value = Math.min(100, value + step);

      if (value >= 97 && !playerReadyRef.current) {
        value = Math.min(value, 97 + Math.random() * 1.5);
      } else if (value >= 100) {
        setProgress(100);
        setPhase("ready");
        return;
      }

      setProgress(Math.floor(value));
      frame = window.setTimeout(
        tick,
        burst ? rand(28, 55) : crawl ? rand(90, 190) : rand(40, 95),
      );
    };

    frame = window.setTimeout(tick, rand(120, 400));
    return () => {
      cancelled = true;
      window.clearTimeout(frame);
    };
  }, []);

  const handleContinue = () => {
    if (phase !== "ready") return;
    setPhase("playing");
    playWhenReadyRef.current = true;
    playerRef.current?.playVideo();
  };

  return (
    <main className="fixed inset-0 bg-black">
      <div ref={hostRef} className="h-full w-full" />

      {phase !== "playing" && (
        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-black px-6 ${
            phase === "ready" ? "cursor-pointer" : ""
          }`}
          onClick={phase === "ready" ? handleContinue : undefined}
          onKeyDown={
            phase === "ready"
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") handleContinue();
                }
              : undefined
          }
          role={phase === "ready" ? "button" : undefined}
          tabIndex={phase === "ready" ? 0 : undefined}
          aria-label={phase === "ready" ? `${action} to continue` : undefined}
        >
          <div className="flex w-full max-w-md flex-col gap-6">
            <div
              className={`flex flex-col gap-1 transition-colors duration-500 ${
                phase === "loading" ? "text-[#39ff14]" : "text-white"
              }`}
            >
              <span className="text-3xl leading-none tracking-wide sm:text-5xl">
                MOAR
              </span>
              <span className="text-3xl leading-none tracking-wide sm:text-5xl">
                Router
              </span>
            </div>

            {phase === "loading" ? (
              <div className="flex w-full flex-col gap-4 text-[10px] text-[#39ff14] sm:text-xs">
                <div className="flex items-center justify-between gap-4">
                  <span className="tracking-widest">Loading Experience</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-3 w-full border border-[#39ff14]/40 p-0.5">
                  <div
                    className="h-full bg-[#39ff14] transition-[width] duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="flex items-center gap-2 text-white/70">
                  <PixelSpeaker />
                  Turn on volume
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-[10px] text-[#39ff14] sm:text-xs">
                <span className="flex items-center gap-2 text-white/70">
                  <PixelSpeaker />
                  Turn on volume
                </span>
                <span className="animate-pulse">
                  {action} to continue
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

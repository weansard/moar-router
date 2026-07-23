"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [action, setAction] = useState<"click" | "tap">("click");

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;
    setAction(isTouch ? "tap" : "click");
  }, []);

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="fixed inset-0 flex cursor-pointer flex-col items-center justify-center gap-8 border-0 bg-black px-6 text-white"
        aria-label={`${action} to continue`}
      >
        <span className="text-center text-3xl leading-relaxed tracking-wide sm:text-5xl">
          MOAR Router
        </span>
        <span className="animate-pulse text-center text-[10px] text-white/70 sm:text-xs">
          {action} to continue
        </span>
      </button>
    );
  }

  return (
    <main className="fixed inset-0 bg-black">
      <iframe
        className="h-full w-full border-0"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
        title="Never Gonna Give You Up"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </main>
  );
}

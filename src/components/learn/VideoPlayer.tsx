"use client";

import React, { useEffect, useRef } from "react";

/** YouTube / Vimeo links → embedded player; anything else → native <video>. */
function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

/**
 * Lesson video. Native videos resume where the learner stopped (lastPosition) and the position is saved
 * every 15 s while playing and on pause / leaving the page.
 */
export function VideoPlayer({ url, title, courseSlug, lessonId, startAt = 0 }: { url: string; title: string; courseSlug: string; lessonId: string; startAt?: number }) {
  const embed = embedUrl(url);
  const ref = useRef<HTMLVideoElement>(null);
  const lastSaved = useRef(startAt);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const save = () => {
      const s = Math.floor(v.currentTime);
      if (Math.abs(s - lastSaved.current) < 5) return;
      lastSaved.current = s;
      void fetch(`/api/me/learn/${courseSlug}/lessons/${lessonId}/position`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ seconds: s }), keepalive: true }).catch(() => undefined);
    };
    const onMeta = () => {
      if (startAt > 5 && startAt < v.duration - 5) v.currentTime = startAt;
    };
    const timer = window.setInterval(() => !v.paused && save(), 15_000);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("pause", save);
    window.addEventListener("pagehide", save);
    return () => {
      save();
      window.clearInterval(timer);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("pause", save);
      window.removeEventListener("pagehide", save);
    };
  }, [courseSlug, lessonId, startAt]);

  return (
    <div className="academy-card-glow overflow-hidden rounded-2xl border border-night-line bg-black">
      <div className="relative aspect-video">
        {embed ? (
          <iframe src={embed} title={title} className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <video ref={ref} key={url} src={url} controls playsInline preload="metadata" className="absolute inset-0 h-full w-full" controlsList="nodownload">
            Your browser can&apos;t play this video.
          </video>
        )}
      </div>
      {!embed && startAt > 5 && <p className="border-t border-night-line px-4 py-2 body-xsm-regular text-night-muted">Resuming from {Math.floor(startAt / 60)}:{String(startAt % 60).padStart(2, "0")}</p>}
    </div>
  );
}

export default VideoPlayer;

import React from "react";

/** YouTube / Vimeo links → embedded player; anything else → native <video>. */
function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export function VideoPlayer({ url, title }: { url: string; title: string }) {
  const embed = embedUrl(url);
  return (
    <div className="academy-card-glow overflow-hidden rounded-2xl border border-night-line bg-black">
      <div className="relative aspect-video">
        {embed ? (
          <iframe src={embed} title={title} className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <video key={url} src={url} controls playsInline preload="metadata" className="absolute inset-0 h-full w-full" controlsList="nodownload">
            Your browser can&apos;t play this video.
          </video>
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;

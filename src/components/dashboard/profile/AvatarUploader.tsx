"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

const TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Profile photo: pick (JPG / PNG / WebP ≤ 3 MB, checked before upload) → upload; or remove. */
export function AvatarUploader({ name, avatar }: { name: string; avatar: string | null }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState(avatar);
  const [busy, setBusy] = useState(false);

  const upload = async (file: File | undefined) => {
    if (!file) return;
    if (!TYPES.includes(file.type)) return toast.error("Unsupported image", { description: "Use a JPG, PNG or WebP image." });
    if (file.size > 3 * 1024 * 1024) return toast.error("Image too large", { description: "Choose an image of 3 MB or less." });
    setBusy(true);
    const id = toast.loading("Uploading your photo…");
    const body = new FormData();
    body.append("avatar", file);
    const res = await fetch("/api/me/avatar", { method: "POST", body }).catch(() => null);
    const data = (await res?.json().catch(() => ({}))) as { avatar?: string; message?: string };
    setBusy(false);
    if (!res?.ok || !data.avatar) return toast.error("Couldn't upload your photo", { id, description: data?.message || "Please try again." });
    setSrc(data.avatar);
    toast.success("Photo updated", { id });
    router.refresh();
  };

  const remove = async () => {
    setBusy(true);
    const id = toast.loading("Removing your photo…");
    const res = await fetch("/api/me/avatar", { method: "DELETE" }).catch(() => null);
    setBusy(false);
    if (!res?.ok) return toast.error("Couldn't remove your photo", { id });
    setSrc(null);
    toast.success("Photo removed", { id });
    router.refresh();
  };

  return (
    <div className="flex flex-wrap items-center gap-5 rounded-3xl border border-night-line bg-night-surface p-6">
      <div className="relative">
        <Avatar name={name} src={src} size="xl" className="ring-2 ring-accent-20" />
        {busy && (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="body-medium font-semibold text-white">Profile photo</p>
        <p className="body-sm-regular text-night-muted">JPG, PNG or WebP, up to 3 MB. Shown to your instructors and on certificates.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <motion.button type="button" whileTap={{ scale: 0.96 }} disabled={busy} onClick={() => input.current?.click()} className="academy-gradient inline-flex h-10 items-center gap-2 rounded-xl px-4 body-sm-medium font-semibold text-white disabled:opacity-60">
            <Camera className="h-4 w-4" />
            {src ? "Change photo" : "Upload photo"}
          </motion.button>
          {src && (
            <motion.button type="button" whileTap={{ scale: 0.96 }} disabled={busy} onClick={remove} className="inline-flex h-10 items-center gap-2 rounded-xl border border-night-line px-4 body-sm-medium text-red hover:border-red/50">
              <Trash2 className="h-4 w-4" />
              Remove
            </motion.button>
          )}
        </div>
        <input ref={input} type="file" accept={TYPES.join(",")} className="sr-only" aria-label="Upload profile photo" onChange={(e) => void upload(e.target.files?.[0])} />
      </div>
    </div>
  );
}

export default AvatarUploader;

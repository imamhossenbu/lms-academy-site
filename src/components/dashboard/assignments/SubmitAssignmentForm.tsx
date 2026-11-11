"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Paperclip, Send } from "lucide-react";
import type { AssignmentItem } from "@/types/academy";
import { SubmitButton } from "@/components/ui/SubmitButton";

const exts = (col: string) => col.split(/[,\s]+/).map((e) => e.trim().toLowerCase()).filter(Boolean).map((e) => (e.startsWith(".") ? e : `.${e}`));

/** Answer box for the assignment's type: file upload, written answer or a link. Validated before upload. */
export function SubmitAssignmentForm({ a }: { a: Pick<AssignmentItem, "id" | "type" | "allowedFileTypes" | "maxFileSizeMb" | "attempts"> }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const allowed = exts(a.allowedFileTypes);
  const schema = z.object({
    textAnswer: a.type === "TEXT" ? z.string().trim().min(10, "Write at least a few sentences").max(20000, "Your answer is too long") : z.string().optional(),
    link: a.type === "LINK" ? z.string().trim().url("Enter a valid link (https://…)") : z.string().optional(),
  });
  const { register, handleSubmit, formState, reset } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { textAnswer: "", link: "" } });

  const pick = (f: File | null) => {
    setFile(f);
    if (!f) return setFileError(null);
    const ext = `.${f.name.split(".").pop()?.toLowerCase() ?? ""}`;
    if (allowed.length && !allowed.includes(ext)) return setFileError(`Allowed file types: ${allowed.join(", ")}`);
    if (f.size > a.maxFileSizeMb * 1024 * 1024) return setFileError(`The file must be ${a.maxFileSizeMb} MB or smaller.`);
    setFileError(null);
  };

  const onSubmit = async (v: z.infer<typeof schema>) => {
    if (a.type === "FILE_UPLOAD" && (!file || fileError)) return setFileError(fileError ?? "Attach your file.");
    const form = new FormData();
    if (a.type === "FILE_UPLOAD" && file) form.append("file", file);
    if (a.type === "TEXT") form.append("textAnswer", v.textAnswer ?? "");
    if (a.type === "LINK") form.append("link", v.link ?? "");
    const id = toast.loading("Submitting your work…");
    const res = await fetch(`/api/assignments/${a.id}/submit`, { method: "POST", body: form }).catch(() => null);
    const data = (await res?.json().catch(() => ({}))) as { message?: string } | undefined;
    if (!res?.ok) return toast.error("Couldn't submit", { id, description: data?.message || "Please try again." });
    toast.success("Submitted!", { id, description: "Your instructor will review it soon." });
    reset();
    setFile(null);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
      {a.type === "FILE_UPLOAD" && (
        <div>
          <label className={`flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-4 transition-colors hover:border-accent ${fileError ? "border-red bg-red-14" : "border-night-line-strong"}`}>
            <Paperclip className="h-5 w-5 text-accent" />
            <span className="min-w-0 flex-1">
              <span className="block body-sm-medium truncate text-white">{file ? file.name : "Choose a file"}</span>
              <span className="block body-xsm-regular text-night-muted">{allowed.length ? allowed.join(", ") : "Any file"} · up to {a.maxFileSizeMb} MB</span>
            </span>
            <input type="file" className="sr-only" accept={allowed.join(",") || undefined} onChange={(e) => pick(e.target.files?.[0] ?? null)} />
          </label>
          {fileError && <p className="mt-1.5 body-xsm-regular text-red">{fileError}</p>}
        </div>
      )}
      {a.type === "TEXT" && (
        <div>
          <textarea rows={6} placeholder="Write your answer…" {...register("textAnswer")} className={`w-full rounded-xl border bg-night-raised px-4 py-3 body-regular text-white outline-none placeholder:text-night-muted focus:border-accent focus:ring-4 focus:ring-accent-10 ${formState.errors.textAnswer ? "border-red" : "border-night-line"}`} />
          {formState.errors.textAnswer && <p className="mt-1.5 body-xsm-regular text-red">{formState.errors.textAnswer.message}</p>}
        </div>
      )}
      {a.type === "LINK" && (
        <div>
          <input type="url" placeholder="https://github.com/you/project" {...register("link")} className={`h-12 w-full rounded-xl border bg-night-raised px-4 body-regular text-white outline-none placeholder:text-night-muted focus:border-accent focus:ring-4 focus:ring-accent-10 ${formState.errors.link ? "border-red" : "border-night-line"}`} />
          {formState.errors.link && <p className="mt-1.5 body-xsm-regular text-red">{formState.errors.link.message}</p>}
        </div>
      )}
      <SubmitButton size="md" loading={formState.isSubmitting} loadingText="Submitting…" icon={<Send className="h-4 w-4" />} className="sm:w-auto">
        {a.attempts ? "Submit again" : "Submit"}
      </SubmitButton>
    </form>
  );
}

export default SubmitAssignmentForm;

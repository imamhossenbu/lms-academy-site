"use client";

import React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Award, Copy, Download, ShieldCheck } from "lucide-react";
import type { CertificateItem } from "@/types/academy";
import { ToneBadge } from "@/components/ui/ToneBadge";

/** A certificate: course, number, issue date, status; verify link, copy link, PDF download (rendered on demand). */
export function CertificateCard({ c }: { c: CertificateItem }) {
  const [downloading, setDownloading] = React.useState(false);
  const download = async () => {
    setDownloading(true);
    const toastId = toast.loading("Preparing your certificate…", { description: c.course.title });
    try {
      const res = await fetch(`/api/me/certificates/${c.id}/pdf`);
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message || "Please try again in a moment.");
      }
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = /filename="([^"]+)"/.exec(res.headers.get("content-disposition") ?? "")?.[1] ?? "certificate.pdf";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      toast.success("Certificate downloaded", { id: toastId, description: "Saved as a PDF — print it or share it." });
    } catch (err) {
      toast.error("Couldn't download the certificate", { id: toastId, description: (err as Error).message });
    } finally {
      setDownloading(false);
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(c.verifyUrl);
      toast.success("Verification link copied", { description: "Share it with employers or on LinkedIn." });
    } catch {
      toast.error("Couldn't copy the link", { description: c.verifyUrl });
    }
  };
  const valid = c.status === "VALID";
  return (
    <motion.div whileHover={{ y: -4 }} className="academy-card-glow relative overflow-hidden rounded-3xl border border-accent/30 bg-night-surface p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent opacity-20 blur-3xl" aria-hidden />
      <div className="flex items-start justify-between gap-3">
        <span className="academy-neon flex h-12 w-12 items-center justify-center rounded-xl border-2 border-accent text-accent">
          <Award className="h-6 w-6" />
        </span>
        <ToneBadge tone={valid ? "green" : "red"} size="sm" dot>
          {valid ? "Valid" : "Revoked"}
        </ToneBadge>
      </div>
      <p className="body-xsm-medium mt-5 text-night-muted">Certificate of completion</p>
      <h3 className="heading-h4 mt-1 font-bold text-white">{c.course.title}</h3>
      <dl className="mt-4 grid grid-cols-2 gap-3 body-xsm-regular">
        <div>
          <dt className="text-night-muted">Certificate no.</dt>
          <dd className="truncate font-semibold text-white">{c.certificateNumber}</dd>
        </div>
        <div>
          <dt className="text-night-muted">Issued</dt>
          <dd className="font-semibold text-white">{new Date(c.issuedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</dd>
        </div>
      </dl>
      <div className="mt-5 flex flex-wrap gap-2">
        {valid && (
          <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={download} disabled={downloading} className="academy-gradient inline-flex h-10 items-center gap-2 rounded-xl px-4 body-sm-medium font-semibold text-white disabled:opacity-60">
            <Download className="h-4 w-4" />
            {downloading ? "Preparing…" : "Download PDF"}
          </motion.button>
        )}
        <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-xl border border-accent px-4 body-sm-medium text-accent hover:bg-accent-10">
          <ShieldCheck className="h-4 w-4" />
          Verify
        </a>
        <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={copy} className="inline-flex h-10 items-center gap-2 rounded-xl border border-night-line px-4 body-sm-medium text-white hover:border-night-line-strong">
          <Copy className="h-4 w-4" />
          Copy link
        </motion.button>
      </div>
    </motion.div>
  );
}

export default CertificateCard;

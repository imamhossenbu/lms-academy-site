"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";
import { postJson } from "@/lib/clientApi";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { CodeInput } from "./CodeInput";
import { codeSchema, type CodeValues } from "./authSchemas";

const COOLDOWN = 30;

/** 6-digit email code → signed in → back to `next`. Submits by itself once all six digits are in. */
export function VerifyCodeForm({ email, next }: { email: string; next: string }) {
  const router = useRouter();
  const [wait, setWait] = useState(COOLDOWN);
  const [sending, setSending] = useState(false);
  const { control, handleSubmit, setError, setValue, formState } = useForm<CodeValues>({ resolver: zodResolver(codeSchema), defaultValues: { code: "" } });

  useEffect(() => {
    if (wait <= 0) return;
    const t = window.setTimeout(() => setWait((w) => w - 1), 1000);
    return () => window.clearTimeout(t);
  }, [wait]);

  const onSubmit = async ({ code }: CodeValues) => {
    const id = toast.loading("Confirming your email…");
    const res = await postJson<{ user: { name: string } }>("/api/auth/verify", { email, code });
    if (!res.ok) {
      toast.error("That code didn't work", { id, description: res.message });
      setError("code", { message: res.message });
      setValue("code", "");
      return;
    }
    toast.success(`Welcome, ${res.data.user.name.split(" ")[0]}!`, { id, description: "Your account is ready." });
    router.replace(next);
    router.refresh();
  };

  const code = useWatch({ control, name: "code" });
  useEffect(() => {
    if (/^\d{6}$/.test(code) && !formState.isSubmitting) void handleSubmit(onSubmit)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const resend = async () => {
    setSending(true);
    const id = toast.loading("Sending a new code…");
    const res = await postJson("/api/auth/resend", { email });
    setSending(false);
    if (!res.ok) return toast.error("Couldn't send a new code", { id, description: res.message });
    toast.success("New code sent", { id, description: `Check ${email} (and your spam folder).` });
    setWait(COOLDOWN);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="flex items-center gap-3 rounded-2xl bg-accent-soft p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
          <MailCheck className="h-5 w-5" />
        </span>
        <p className="body-sm-regular text-night-soft">
          Code sent to <span className="break-all font-semibold text-white">{email}</span>
        </p>
      </div>
      <Controller control={control} name="code" render={({ field, fieldState }) => <CodeInput value={field.value} onChange={field.onChange} invalid={!!fieldState.error} disabled={formState.isSubmitting} />} />
      {formState.errors.code && <p className="body-xsm-regular text-red">{formState.errors.code.message}</p>}
      <SubmitButton loading={formState.isSubmitting} loadingText="Confirming…">
        Confirm email
      </SubmitButton>
      <div className="flex items-center justify-between body-sm-regular">
        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="text-night-muted hover:text-white">
          Use a different email
        </Link>
        <button type="button" onClick={resend} disabled={wait > 0 || sending} className="body-sm-medium text-accent disabled:text-night-muted">
          {wait > 0 ? `Resend in ${wait}s` : "Resend code"}
        </button>
      </div>
    </form>
  );
}

export default VerifyCodeForm;

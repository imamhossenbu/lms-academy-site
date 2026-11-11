"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import { PasswordField } from "@/components/ui/PasswordField";
import { SubmitButton } from "@/components/ui/SubmitButton";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z.string().min(8, "Use at least 8 characters").max(100),
    confirm: z.string(),
  })
  .refine((v) => v.newPassword === v.confirm, { message: "Passwords don't match", path: ["confirm"] })
  .refine((v) => v.newPassword !== v.currentPassword, { message: "Choose a password you haven't used here", path: ["newPassword"] });
type Values = z.infer<typeof schema>;

/** Change password: current, new, confirm. */
export function PasswordForm() {
  const { register, handleSubmit, formState, reset, setError } = useForm<Values>({ resolver: zodResolver(schema), mode: "onTouched", defaultValues: { currentPassword: "", newPassword: "", confirm: "" } });
  const e = formState.errors;

  const onSubmit = async (v: Values) => {
    const id = toast.loading("Updating your password…");
    const res = await fetch("/api/me/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword: v.currentPassword, newPassword: v.newPassword }) }).catch(() => null);
    const data = (await res?.json().catch(() => ({}))) as { message?: string };
    if (!res?.ok) {
      toast.error("Couldn't change your password", { id, description: data?.message || "Please try again." });
      if (/current/i.test(data?.message ?? "")) setError("currentPassword", { message: data.message });
      else if (data?.message) setError("newPassword", { message: data.message });
      return;
    }
    toast.success("Password changed", { id, description: "Use your new password next time you sign in." });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 rounded-3xl border border-night-line bg-night-surface p-6">
      <div>
        <h2 className="heading-h4 font-bold text-white">Password</h2>
        <p className="body-sm-regular text-night-muted">Use a password you don&apos;t use anywhere else.</p>
      </div>
      <PasswordField id="pw-current" label="Current password" autoComplete="current-password" error={e.currentPassword?.message} {...register("currentPassword")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <PasswordField id="pw-new" label="New password" autoComplete="new-password" placeholder="At least 8 characters" error={e.newPassword?.message} {...register("newPassword")} />
        <PasswordField id="pw-confirm" label="Confirm new password" autoComplete="new-password" error={e.confirm?.message} {...register("confirm")} />
      </div>
      <SubmitButton size="md" loading={formState.isSubmitting} loadingText="Updating…" icon={<KeyRound className="h-4 w-4" />} className="sm:w-auto">
        Change password
      </SubmitButton>
    </form>
  );
}

export default PasswordForm;

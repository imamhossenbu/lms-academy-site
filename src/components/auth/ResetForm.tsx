"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import { postJson } from "@/lib/clientApi";
import { PasswordField } from "@/components/ui/PasswordField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { CodeInput } from "./CodeInput";

const schema = z
  .object({
    code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code from your email"),
    newPassword: z.string().min(8, "Use at least 8 characters").max(100),
    confirm: z.string(),
  })
  .refine((v) => v.newPassword === v.confirm, { message: "Passwords don't match", path: ["confirm"] });

/** Step 2: code + new password (twice) → back to sign in. */
export function ResetForm({ email }: { email: string }) {
  const router = useRouter();
  const { control, register, handleSubmit, formState, setError } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { code: "", newPassword: "", confirm: "" } });
  const onSubmit = async (v: z.infer<typeof schema>) => {
    const id = toast.loading("Updating your password…");
    const res = await postJson("/api/auth/reset", { email, code: v.code, newPassword: v.newPassword });
    if (!res.ok) {
      toast.error("Couldn't reset your password", { id, description: res.message });
      setError(/code/i.test(res.message) ? "code" : "newPassword", { message: res.message });
      return;
    }
    toast.success("Password changed", { id, description: "Sign in with your new password." });
    router.replace(`/login`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <p className="body-sm-regular text-night-muted">
        Code sent to <span className="break-all font-semibold text-white">{email}</span>
      </p>
      <Controller control={control} name="code" render={({ field, fieldState }) => <CodeInput value={field.value} onChange={field.onChange} invalid={!!fieldState.error} />} />
      {formState.errors.code && <p className="-mt-3 body-xsm-regular text-red">{formState.errors.code.message}</p>}
      <PasswordField id="reset-new" label="New password" autoComplete="new-password" placeholder="At least 8 characters" error={formState.errors.newPassword?.message} {...register("newPassword")} />
      <PasswordField id="reset-confirm" label="Confirm new password" autoComplete="new-password" error={formState.errors.confirm?.message} {...register("confirm")} />
      <SubmitButton loading={formState.isSubmitting} loadingText="Saving…" icon={<KeyRound className="h-4 w-4" />}>
        Set new password
      </SubmitButton>
      <p className="text-center body-sm-regular">
        <Link href={`/forgot-password?email=${encodeURIComponent(email)}`} className="text-accent hover:underline">
          Send a new code
        </Link>
      </p>
    </form>
  );
}

export default ResetForm;

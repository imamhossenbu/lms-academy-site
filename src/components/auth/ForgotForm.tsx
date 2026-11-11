"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Mail } from "lucide-react";
import { postJson } from "@/lib/clientApi";
import { InputField } from "@/components/ui/InputField";
import { SubmitButton } from "@/components/ui/SubmitButton";

const schema = z.object({ email: z.string().trim().min(1, "Enter your email address").email("Enter a valid email address") });

/** Step 1: email → a 6-digit reset code is sent → step 2 (kept in the URL). */
export function ForgotForm({ defaultEmail }: { defaultEmail: string }) {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { email: defaultEmail } });
  const onSubmit = async ({ email }: z.infer<typeof schema>) => {
    const id = toast.loading("Sending your reset code…");
    const res = await postJson("/api/auth/forgot", { email });
    if (!res.ok) return toast.error("Couldn't send the code", { id, description: res.message });
    toast.success("Check your email", { id, description: "If an account exists for that email, a 6-digit code is on its way." });
    router.push(`/forgot-password?step=reset&email=${encodeURIComponent(email)}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <InputField id="forgot-email" type="email" autoComplete="email" label="Email" placeholder="you@example.com" leftElement={<Mail className="h-4 w-4" />} error={formState.errors.email?.message} {...register("email")} />
      <SubmitButton loading={formState.isSubmitting} loadingText="Sending…" icon={<ArrowRight className="h-4 w-4" />}>
        Send reset code
      </SubmitButton>
    </form>
  );
}

export default ForgotForm;

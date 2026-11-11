"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Mail, User } from "lucide-react";
import { postJson } from "@/lib/clientApi";
import { InputField } from "@/components/ui/InputField";
import { PasswordField } from "@/components/ui/PasswordField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { signupSchema, type SignupValues } from "./authSchemas";

/** Name, email, password → account created and a code emailed → the verify step (kept in the URL). */
export function SignupForm({ next }: { next: string }) {
  const router = useRouter();
  const { register, handleSubmit, setError, formState } = useForm<SignupValues>({ resolver: zodResolver(signupSchema), mode: "onTouched" });

  const onSubmit = async (values: SignupValues) => {
    const id = toast.loading("Creating your account…");
    const res = await postJson("/api/auth/register", values);
    if (!res.ok) {
      toast.error("Couldn't create your account", { id, description: res.message });
      if (res.status === 409) setError("email", { message: res.message });
      else if (/password/i.test(res.message)) setError("password", { message: res.message });
      return;
    }
    toast.success("Check your email", { id, description: `We sent a 6-digit code to ${values.email}.` });
    router.push(`/signup?step=verify&email=${encodeURIComponent(values.email)}&next=${encodeURIComponent(next)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <InputField id="signup-name" autoComplete="name" label="Full name" placeholder="Your name" leftElement={<User className="h-4 w-4" />} error={formState.errors.name?.message} {...register("name")} />
      <InputField id="signup-email" type="email" autoComplete="email" label="Email" placeholder="you@example.com" leftElement={<Mail className="h-4 w-4" />} error={formState.errors.email?.message} {...register("email")} />
      <PasswordField id="signup-password" autoComplete="new-password" label="Password" placeholder="At least 8 characters" error={formState.errors.password?.message} {...register("password")} />
      <SubmitButton loading={formState.isSubmitting} loadingText="Creating account…" icon={<ArrowRight className="h-4 w-4" />}>
        Create account
      </SubmitButton>
    </form>
  );
}

export default SignupForm;

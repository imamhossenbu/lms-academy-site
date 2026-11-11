"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Mail } from "lucide-react";
import { postJson } from "@/lib/clientApi";
import { InputField } from "@/components/ui/InputField";
import { PasswordField } from "@/components/ui/PasswordField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { loginSchema, type LoginValues } from "./authSchemas";

/** Email + password sign-in; an unconfirmed account is sent to the code step with a fresh code. */
export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const { register, handleSubmit, setError, formState } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), mode: "onTouched" });

  const onSubmit = async (values: LoginValues) => {
    const id = toast.loading("Signing you in…");
    const res = await postJson<{ user: { name: string } }>("/api/auth/login", values);
    if (res.ok) {
      toast.success(`Welcome back, ${res.data.user.name.split(" ")[0]}!`, { id });
      router.replace(next);
      router.refresh();
      return;
    }
    if (res.code === "EMAIL_NOT_VERIFIED") {
      await postJson("/api/auth/resend", { email: values.email });
      toast.info("Confirm your email first", { id, description: "We've sent you a new 6-digit code." });
      router.push(`/signup?step=verify&email=${encodeURIComponent(values.email)}&next=${encodeURIComponent(next)}`);
      return;
    }
    toast.error("Couldn't sign you in", { id, description: res.message });
    if (res.status === 401) setError("password", { message: res.message });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <InputField id="login-email" type="email" autoComplete="email" label="Email" placeholder="you@example.com" leftElement={<Mail className="h-4 w-4" />} error={formState.errors.email?.message} {...register("email")} />
      <div>
        <PasswordField id="login-password" autoComplete="current-password" label="Password" placeholder="Your password" error={formState.errors.password?.message} {...register("password")} />
        <div className="mt-2 text-right">
          <Link href="/forgot-password" className="body-sm-medium text-accent hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
      <SubmitButton loading={formState.isSubmitting} loadingText="Signing in…" icon={<ArrowRight className="h-4 w-4" />}>
        Sign in
      </SubmitButton>
    </form>
  );
}

export default LoginForm;

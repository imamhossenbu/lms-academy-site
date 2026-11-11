import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, safeNext } from "@/lib/session";
import { requireAcademy } from "@/lib/tenant";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";
import { VerifyCodeForm } from "@/components/auth/VerifyCodeForm";

export const metadata: Metadata = { title: "Create account", robots: { index: false } };

type Props = { searchParams: Promise<{ next?: string; step?: string; email?: string }> };

/** Sign-up, then the email-code step (?step=verify&email=…) — the step lives in the URL so a reload keeps it. */
export default async function SignupPage({ searchParams }: Props) {
  const academy = await requireAcademy();
  const sp = await searchParams;
  const next = safeNext(sp.next);
  if (await getSession()) redirect(next);
  const email = sp.step === "verify" ? (sp.email ?? "").trim().slice(0, 120) : "";
  const login = (
    <>
      Already have an account?{" "}
      <Link href={`/login?next=${encodeURIComponent(next)}`} className="body-sm-medium text-accent hover:underline">
        Sign in
      </Link>
    </>
  );

  return email ? (
    <AuthShell academyName={academy.name} title="Check your email" subtitle="Enter the 6-digit code we sent you to finish creating your account." footer={login}>
      <VerifyCodeForm email={email} next={next} />
    </AuthShell>
  ) : (
    <AuthShell academyName={academy.name} title="Create your account" subtitle={`Join ${academy.name} and start learning today.`} footer={login}>
      <SignupForm next={next} />
    </AuthShell>
  );
}

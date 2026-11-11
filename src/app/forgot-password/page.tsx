import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { requireAcademy } from "@/lib/tenant";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotForm } from "@/components/auth/ForgotForm";
import { ResetForm } from "@/components/auth/ResetForm";

export const metadata: Metadata = { title: "Reset password", robots: { index: false } };

type Props = { searchParams: Promise<{ step?: string; email?: string }> };

/** Forgot password: email → code + new password (?step=reset&email= keeps the step on reload). */
export default async function ForgotPasswordPage({ searchParams }: Props) {
  const academy = await requireAcademy();
  if (await getSession()) redirect("/dashboard?tab=profile");
  const sp = await searchParams;
  const email = (sp.email ?? "").trim().slice(0, 120);
  const back = (
    <>
      Remembered it?{" "}
      <Link href="/login" className="body-sm-medium text-accent hover:underline">
        Sign in
      </Link>
    </>
  );
  return sp.step === "reset" && email ? (
    <AuthShell academyName={academy.name} title="Choose a new password" subtitle="Enter the code we emailed you and your new password." footer={back}>
      <ResetForm email={email} />
    </AuthShell>
  ) : (
    <AuthShell academyName={academy.name} title="Forgot your password?" subtitle="We'll email you a 6-digit code to reset it." footer={back}>
      <ForgotForm defaultEmail={email} />
    </AuthShell>
  );
}

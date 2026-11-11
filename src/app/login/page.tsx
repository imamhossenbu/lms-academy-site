import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, safeNext } from "@/lib/session";
import { requireAcademy } from "@/lib/tenant";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

type Props = { searchParams: Promise<{ next?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const academy = await requireAcademy();
  const next = safeNext((await searchParams).next);
  if (await getSession()) redirect(next);
  return (
    <AuthShell
      academyName={academy.name}
      title="Welcome back"
      subtitle={`Sign in to your ${academy.name} account.`}
      footer={
        <>
          New here?{" "}
          <Link href={`/signup?next=${encodeURIComponent(next)}`} className="body-sm-medium text-accent hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm next={next} />
    </AuthShell>
  );
}

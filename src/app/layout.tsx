import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { getSession } from "@/lib/session";
import { getAcademy } from "@/lib/tenant";
import type { AcademyProfile } from "@/types/academy";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MaintenanceBar } from "@/components/layout/MaintenanceBar";
import { AcademyUnavailable, NoAcademy, ServiceDown } from "@/components/states/AcademyStates";
import "./globals.css";

const aeonik = localFont({
  src: [
    { path: "./fonts/Aeonik-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Aeonik-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Aeonik-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Aeonik-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Aeonik-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-aeonik",
  display: "swap",
});

/** null = no academy at this address; "error" = backend unreachable. */
async function loadAcademy(): Promise<AcademyProfile | null | "error"> {
  try {
    return await getAcademy();
  } catch {
    return "error";
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const academy = await loadAcademy();
  if (!academy || academy === "error") return { title: "Academy", robots: { index: false } };
  return {
    title: { default: academy.tagline ? `${academy.name} — ${academy.tagline}` : academy.name, template: `%s · ${academy.name}` },
    description: academy.tagline || `Online courses from ${academy.name}.`,
    icons: academy.branding.faviconUrl ? { icon: academy.branding.faviconUrl } : undefined,
    openGraph: { siteName: academy.name, type: "website" },
    robots: academy.available ? undefined : { index: false },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const academy = await loadAcademy();
  const ok = academy && academy !== "error" && academy.available ? academy : null;
  const accent = academy && academy !== "error" ? academy.branding.accent : "orange";
  const session = ok ? await getSession() : null;

  return (
    <html lang="en" className={aeonik.variable} data-accent={accent}>
      <body className={`${aeonik.className} antialiased min-h-screen bg-white font-sans text-primary-500`} suppressHydrationWarning>
        {academy === "error" ? (
          <ServiceDown />
        ) : !academy ? (
          <NoAcademy />
        ) : !ok ? (
          <AcademyUnavailable name={academy.name} />
        ) : (
          <>
            {ok.maintenance.enabled && <MaintenanceBar message={ok.maintenance.message} until={ok.maintenance.until} />}
            <SiteHeader brand={{ name: ok.name, initials: ok.logoInitials, logoUrl: ok.branding.logoUrl, logoDarkUrl: ok.branding.logoDarkUrl }} user={session ? { name: session.user.name, email: session.user.email, avatar: session.user.avatar } : null} />
            <main>{children}</main>
            <SiteFooter academy={ok} />
          </>
        )}
        <Toaster position="top-right" richColors offset={{ top: 88, right: 16 }} mobileOffset={{ top: 80 }} />
      </body>
    </html>
  );
}

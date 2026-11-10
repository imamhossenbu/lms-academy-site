import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
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

export const metadata: Metadata = {
  title: { default: "Academy", template: "%s · Academy" },
  description: "Courses, live classes and certificates from your academy.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={aeonik.variable}>
      <body className={`${aeonik.className} antialiased min-h-screen bg-white font-sans text-primary-500`} suppressHydrationWarning>
        <main>{children}</main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

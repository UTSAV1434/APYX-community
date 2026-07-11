import type { Metadata } from "next";
import { inter, outfit, jetbrainsMono } from "@/lib/fonts";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/layout/command-menu";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "APYX — Student Technology Ecosystem",
    template: "%s — APYX",
  },
  description:
    "APYX empowers students to learn, build, and innovate through hackathons, workshops, and real-world projects. Join the ecosystem.",
  keywords: [
    "APYX",
    "student tech community",
    "hackathon",
    "workshop",
    "student ecosystem",
    "technology",
    "innovation",
  ],
  authors: [{ name: "APYX" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "APYX",
    title: "APYX — Student Technology Ecosystem",
    description:
      "APYX empowers students to learn, build, and innovate through hackathons, workshops, and real-world projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "APYX — Student Technology Ecosystem",
    description:
      "APYX empowers students to learn, build, and innovate through hackathons, workshops, and real-world projects.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ExperienceProvider } from "@/components/ui/experience/experience-provider";
import { PageTransition } from "@/components/ui/experience/page-transition";
import { NoiseTexture } from "@/components/ui/experience/backgrounds";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground relative">
        <ExperienceProvider>
          <NoiseTexture />
          <TooltipProvider>
            <Navbar />
            <PageTransition>
              <main id="main-content" className="min-h-screen flex-1">{children}</main>
            </PageTransition>
            <Footer />
            <CommandMenu />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                },
              }}
            />
          </TooltipProvider>
        </ExperienceProvider>
      </body>
    </html>
  );
}

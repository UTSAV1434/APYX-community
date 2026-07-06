import type { Metadata } from "next";
import { inter, outfit, jetbrainsMono, playfair } from "@/lib/fonts";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${playfair.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <TooltipProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CommandMenu />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#141B34",
                border: "1px solid #1F2947",
                color: "#FFFFFF",
              },
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}

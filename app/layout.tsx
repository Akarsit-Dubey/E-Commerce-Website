import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NOVA | Modern Essentials for Everyday Life",
    template: "%s | NOVA",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  description:
    "NOVA creates architectural tailoring, pure Mongolian cashmere knitwear, and tactile accessories designed for enduring distinction.",
  keywords: [
    "minimalist fashion",
    "modern essentials",
    "cashmere knitwear",
    "architectural tailoring",
    "luxury lifestyle",
    "sustainable fashion",
  ],
  authors: [{ name: "NOVA Design Studio" }],
  creator: "NOVA Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nova-essentials.com",
    siteName: "NOVA",
    title: "NOVA | Modern Essentials for Everyday Life",
    description:
      "Modern essentials designed for everyday life. Virgin wool tailoring, Grade-A cashmere, and handcrafted leather goods.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=1200",
        width: 1200,
        height: 630,
        alt: "NOVA Studio Modern Essentials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA | Modern Essentials",
    description:
      "Modern essentials designed for everyday life. Virgin wool tailoring, Grade-A cashmere, and handcrafted leather goods.",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=1200",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)]"
      >
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

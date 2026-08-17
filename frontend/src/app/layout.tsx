import type { Metadata } from "next";
import { Inter, Fraunces, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SureBuy | Buy Smart, Save More",
    template: "%s | SureBuy",
  },
  description: "Trusted devices and better prices. The leading platform to buy and sell electronics.",
  keywords: ["electronics", "buy phones", "sell phones", "refurbished devices", "SureBuy", "mobile repair"],
  authors: [{ name: "SureBuy" }],
  openGraph: {
    title: "SureBuy | Buy Smart, Save More",
    description: "Trusted devices and better prices. The leading platform to buy and sell electronics.",
    url: "https://surebuy.store",
    siteName: "SureBuy",
    images: [
      {
        url: "https://cdn2.clevup.in/111129/1644850958193_114304_logo.jpg?height=600&format=webp",
        width: 1200,
        height: 600,
        alt: "SureBuy Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SureBuy | Buy Smart, Save More",
    description: "Trusted devices and better prices. The leading platform to buy and sell electronics.",
    images: ["https://cdn2.clevup.in/111129/1644850958193_114304_logo.jpg?height=600&format=webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} ${spaceMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

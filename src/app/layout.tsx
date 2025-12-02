import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Montserrat } from "next/font/google";
import { Navbar } from "@/components/navigation/navbar";
import "./globals.css";
import { VoiceChatAgent } from "@/components/voice-chat-agent";

const geistSans = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CelcomDigi — Malaysia's Widest and Fastest Network",
  description:
    "Experience the combined strength of Celcom and Digi with powerful 5G plans, fibre, devices and rewards tailored for every Malaysian.",
  openGraph: {
    title: "CelcomDigi — Malaysia's Widest and Fastest Network",
    description:
      "Discover CelcomDigi's 5G plans, fibre bundles, device offers and lifestyle rewards all in one place.",
    url: "https://www.celcomdigi.com/",
    siteName: "CelcomDigi",
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CelcomDigi — Malaysia's Widest and Fastest Network",
    description:
      "Unlock 5G freedom, fibre speed, device savings and lifestyle perks with CelcomDigi.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <VoiceChatAgent />
        {children}
      </body>
    </html>
  );
}

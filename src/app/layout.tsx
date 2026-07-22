import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Instrument_Serif,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "TRINETRA by DEDSEC | AI Digital Public Safety Intelligence",
  description:
    "Built by Team DEDSEC. Proactive AI platform to detect digital arrest scams, counterfeit currency, and organised fraud networks for law enforcement, banks, and citizens. ET AI Hackathon 2026.",
  keywords: [
    "digital arrest",
    "counterfeit currency",
    "fraud network",
    "cybercrime",
    "public safety AI",
    "TRINETRA",
    "DEDSEC",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${mono.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

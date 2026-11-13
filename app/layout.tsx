import type { Metadata, Viewport } from "next";
import { VT323 } from "next/font/google";
import "98.css";
import "./globals.css";
import "./phone.css";

// Pixel LCD face for the mobile keypad-phone screen.
const lcdFont = VT323({ weight: "400", subsets: ["latin"], variable: "--font-lcd", display: "swap" });

export const metadata: Metadata = {
  title: "Kanak Agrawal | Portfolio",
  description:
    "Portfolio of Kanak Agrawal, full-stack developer and Software Engineering Intern at Bajaj Finserv Health, presented as a retro desktop.",
  openGraph: {
    title: "Kanak Agrawal | Portfolio",
    description: "Full-stack developer. Next.js, React, NestJS, MongoDB.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#008080",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lcdFont.variable}>
      <body>{children}</body>
    </html>
  );
}

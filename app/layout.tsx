import type { Metadata, Viewport } from "next";
import "98.css";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

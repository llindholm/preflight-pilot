import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Preflight — Millwork Historical Project Pilot",
  description:
    "Know what’s approved before you fabricate. A historical-project experiment in evidence-backed production-release review for architectural millwork shops.",
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

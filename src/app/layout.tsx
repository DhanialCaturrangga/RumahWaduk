import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rumah Waduk",
  description: "Nikmati kopi & sunset di tempat yang paling nyaman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} antialiased bg-(--color-brand-bg) text-(--color-brand-text) font-sans overflow-x-hidden`}
      >  {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tago | NFC Business Cards for Smart Networking",
  description: "Upgrade to an NFC business card and share your contact details, social media, and website with a single tap. No apps needed—fast, digital, and professional networking made simple.",
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
        <header>
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">Tago</Link>
            <nav className="flex gap-6">
              <Link href="/products" className="hover:text-blue-500 transition-colors">Products</Link>
              <Link href="/signup" className="hover:text-blue-500 transition-colors">Sign Up</Link>
              <Link href="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
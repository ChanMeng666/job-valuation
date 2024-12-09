import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MovingBackground from "../components/ui/moving-background";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Job Valuation",
  description: "Evaluate your job's value comprehensively",
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}>
        <MovingBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
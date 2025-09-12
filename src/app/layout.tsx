import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MovingBackground from "../components/ui/moving-background";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { DeveloperFooter } from "@/components/DeveloperFooter";
import { GEOHead } from "@/components/GEOHead";
import { GEOAnalyticsProvider } from "@/components/GEOAnalyticsProvider";

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
  title: "Job Valuation - Free Career Assessment Tool",
  description: "Free professional career assessment tool with scientific evaluation across 10 dimensions. Evaluate your job's value comprehensively with personalized recommendations.",
  keywords: "career assessment, job evaluation, salary negotiation, career planning, job satisfaction, professional development",
  authors: [{ name: "Chan Meng", url: "https://github.com/ChanMeng666" }],
  creator: "Chan Meng",
  publisher: "Job Valuation Tool",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://job-valuation.vercel.app",
    title: "Job Valuation - Free Career Assessment Tool",
    description: "Free professional career assessment tool with scientific evaluation across 10 dimensions",
    siteName: "Job Valuation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Valuation - Free Career Assessment Tool",
    description: "Free professional career assessment tool with scientific evaluation across 10 dimensions",
  },
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
      <head>
        <GEOHead 
          pageType="home"
          title="Job Valuation - Free Career Assessment Tool"
          description="Free professional career assessment tool with scientific evaluation across 10 dimensions. Evaluate your job's value comprehensively with personalized recommendations."
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}>
        <GEOAnalyticsProvider>
          <ThemeProvider defaultTheme="light" storageKey="job-valuation-theme">
            <MovingBackground />
            <Navbar />
            <div className="relative z-10 pt-16 min-h-screen flex flex-col">
              <main className="flex-1">
                {children}
              </main>
              <DeveloperFooter variant="simple" />
            </div>
          </ThemeProvider>
        </GEOAnalyticsProvider>
      </body>
    </html>
  );
}
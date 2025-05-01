import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Header";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import { QueryProvider } from "@/providers/queryProvider";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/contexts/useAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iMoodly",
  description: "Gerenciador e diário de emoções",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <QueryProvider>
            <ThemeProviderWrapper>
              <Navbar />
              {children}
              <Analytics />
            </ThemeProviderWrapper>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

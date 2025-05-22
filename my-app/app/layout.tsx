import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Header";
import ThemeProviderWrapper from "@/components/shared/ThemeProviderWrapper";
import { QueryProvider } from "@/providers/queryProvider";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "../components/shared/Providers";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <QueryProvider>
            <ThemeProviderWrapper>
              <Navbar />
              {children}
              <Analytics />
              <Toaster richColors expand={true} />
            </ThemeProviderWrapper>
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}

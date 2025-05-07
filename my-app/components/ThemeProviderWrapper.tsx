"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Só aplica o ThemeProvider se o componente foi montado no cliente
  return isMounted ? <ThemeProvider attribute="class" defaultTheme="dark">{children}</ThemeProvider> : null;
}

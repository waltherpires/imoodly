"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import { ProgressBar } from "../my-ui/ProgressBar";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ProgressBar />
        {children}
    </SessionProvider>
  );
}

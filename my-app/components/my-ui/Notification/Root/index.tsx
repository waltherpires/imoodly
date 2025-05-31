import { ReactNode } from "react";

interface RootProps {
  children: ReactNode;
}

export function Root({ children }: RootProps) {
  return <div className="flex items-center p-2 min-w-70 justify-start gap-4 sm:gap-6">{children}</div>;
}
import { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

export function Content({ children }: ContentProps) {
  return <div className="flex flex-col text-sm break-words whitespace-normal w-60 text-left hyphens-auto" lang="pt">{children}</div>;
}
import { ReactNode } from "react";

interface ActionsButtonProps {
  children: ReactNode;
}

export function ActionsButton({ children }: ActionsButtonProps) {
  return <div className="flex gap-2 flex-col sm:flex-row justify-between">{children}</div>;
}
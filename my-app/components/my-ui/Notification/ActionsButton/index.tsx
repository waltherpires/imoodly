import { ReactNode } from "react";

interface ActionsButtonProps {
  children: ReactNode;
}

export function ActionsButton({ children }: ActionsButtonProps) {
  return <div>{children}</div>;
}
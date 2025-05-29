"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <Button onClick={handleLogout} className={className} variant="link">
      Sair
    </Button>
  );
}

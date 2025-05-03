"use client";

import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

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
    <Button onClick={handleLogout} className={className} variant="ghost">
      Sair
    </Button>
  );
}

"use client";

import { signOut } from "next-auth/react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  const handleLogout = async () => {
    NProgress.start();
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <span onClick={handleLogout} className={className}>
      Sair
    </span>
  );
}

"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ButtonWithLoadingProps {
  onClick?: () => Promise<void> | void;
  loadingText?: string;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
}

export function ButtonWithLoading({
  onClick,
  loadingText = "Carregando...",
  loading = false,
  className,
  type = "button",
  children,
}: ButtonWithLoadingProps) {
  const handleClick = async () => {
    if (onClick) await onClick();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      className={className}
      type={type}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

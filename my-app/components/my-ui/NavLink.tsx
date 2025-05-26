/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  onClick?: (e?: any) => void;
}

export function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (href) {
    return (
      <Link
        href={href}
        className="font-semibold pl-4 text-sm max-sm:hover:bg-zinc-100 max-sm:dark:hover:bg-zinc-900 py-2 rounded"
      >
        <Button
          className={`${
            isActive ? "bg-[#f9bc60] hover:bg-[#f9bc60] dark:bg-white" : ""
          } cursor-pointer`}
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              onClick();
            }
            NProgress.start();
          }}
          variant={isActive ? "default" : "link"}
        >
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <div className="font-semibold pl-4 text-sm max-sm:hover:bg-zinc-100 max-sm:dark:hover:bg-zinc-900 py-2 rounded">
      <Button
        className={`${
          isActive ? "bg-[#f9bc60] hover:bg-[#f9bc60] dark:bg-white" : ""
        } cursor-pointer`}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
          NProgress.start();
        }}
        variant={isActive ? "default" : "link"}
      >
        {children}
      </Button>
    </div>
  );
}

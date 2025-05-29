/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  onClick?: (e?: any) => void;
  activePath?: string;
}

export function NavLink({ href, children, onClick, activePath }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href
    ? pathname === href
    : activePath
    ? pathname === activePath
    : false;

  const buttonClass = `${
    isActive ? "bg-[#f9bc60] hover:bg-[#f9bc60] dark:bg-white" : ""
  } cursor-pointer`;

  if (href) {
    return (
      <Link
        href={href}
        className="font-semibold pl-4 text-sm max-sm:hover:bg-zinc-100 max-sm:dark:hover:bg-zinc-900 py-2 rounded"
      >
        <Button
          className={buttonClass}
          onClick={onClick}
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
        className={buttonClass}
        onClick={() => {
          if (onClick) onClick();
        }}
        variant={isActive ? "default" : "link"}
      >
        {children}
      </Button>
    </div>
  );
}

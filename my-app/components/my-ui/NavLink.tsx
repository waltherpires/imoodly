import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <Button onClick={() => NProgress.start()} variant={isActive ? "default" : "ghost"}>{children}</Button>
    </Link>
  );
}
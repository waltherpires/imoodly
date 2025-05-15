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
    <Link href={href} className="font-semibold pl-4 text-sm max-sm:hover:bg-zinc-100 max-sm:dark:hover:bg-zinc-900 py-2 rounded">
      <Button onClick={() => NProgress.start()} variant={isActive ? "default" : "link"}>{children}</Button>
    </Link>
  );
}
import Link from "next/link";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type MyDropdownProps = {
  className?: string;
};

export default function MyDropdown({ className }: MyDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className} data-testid="my-dropdown-trigger">
        <Avatar>
          <AvatarImage />
          <AvatarFallback className="hover:bg-zinc-200 hover:text-black transition duration-200">
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile" onClick={() => NProgress.start()} data-testid="perfil-item">
          <DropdownMenuItem className="py-4 font-semibold"><span className="hover:underline underline-offset-4">Perfil</span></DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <LogoutButton className="cursor-pointer pl-0"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import Link from "next/link";
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
import { Button } from "../ui/button";

type MyDropdownProps = {
  className?: string;
};

export default function MyDropdown({ className }: MyDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={className}
        data-testid="my-dropdown-trigger"
        asChild
      >
        <Button variant="ghost" className="self-center transition duration-200">
          <User className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile" data-testid="perfil-item">
          <DropdownMenuItem className="py-4 font-semibold">
            <span className="hover:underline underline-offset-4">Perfil</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <LogoutButton className="cursor-pointer pl-0" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

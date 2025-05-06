import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type MyDropdownProps = {
    className?: string;
}

export default function MyDropdown({ className }: MyDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <Avatar>
            <AvatarImage src="https://githu.com/shadcdn.png" />
            <AvatarFallback className="hover:bg-zinc-200 hover:text-black transition duration-200"><User /></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
                Perfil
            </DropdownMenuItem>
        <DropdownMenuItem><LogoutButton /></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

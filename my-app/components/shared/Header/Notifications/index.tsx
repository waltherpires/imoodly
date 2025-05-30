// import { Notification } from "@/components/my-ui/Notification";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { BellRing } from "lucide-react";

export default function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="transition duration-200">
          <BellRing className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
{/*         <Notification.Root>
          <Notification.Icon icon={BellRing} />
          <Notification.Content>
            Teste
          </Notification.Content>
        </Notification.Root> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

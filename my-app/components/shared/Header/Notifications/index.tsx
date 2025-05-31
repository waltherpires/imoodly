import { Button } from "@/components/ui/button";
import { Bell, BellRing } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AccordionNotification from "./AccordionNotification";
import { useNotifications } from "@/hooks/notificationHooks/useNotification";

export default function Notifications() {
  const { data: notifications, isLoading } = useNotifications();

  const hasNotifications =
    !!notifications && notifications.some((n) => !n.isRead);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" className="transition duration-200">
          {hasNotifications && !isLoading ? (
            <BellRing className="w-5 h-5 text-koromiko-600 fill-koromiko-400 dark:text-koromiko-400 dark:fill-koromiko-300 animate-bounce" />
          ) : (
            <Bell className="w-5 h-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex-col mr-2 sm:mr-10 min-w-80 sm:min-w-110 max-h-100 overflow-auto">
        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
          Notificações
        </div>
        <div className="bg-border -mx-1 my-1 h-px" />
        <AccordionNotification />
      </PopoverContent>
    </Popover>
  );
}

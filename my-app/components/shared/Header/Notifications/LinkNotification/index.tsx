import { Notification } from "@/components/my-ui/Notification";
import { Button } from "@/components/ui/button";
import { Handshake, Check, X } from "lucide-react";
import { NotificationType } from "../type";

interface LinkNotificationProps {
  notification: NotificationType;
}

export default function LinkNotification({
  notification,
}: LinkNotificationProps) {
  return (
    <>
      <div className="bg-border -mx-1 my-1 h-px" />
      <Notification.Root>
        <Notification.Icon icon={Handshake} className="w-4" />
        <Notification.Content>
          {`Solicitação de acompanhamento de ${notification.sender?.name}`}
        </Notification.Content>
        <Notification.ActionsButton>
          <Button variant="ghost" className="cursor-pointer">
            <Check className="text-sea-nymph-400" />
          </Button>
          <Button variant="ghost" className="cursor-pointer">
            <X className="text-red-400" />
          </Button>
        </Notification.ActionsButton>
      </Notification.Root>
    </>
  );
}

import { Notification } from "@/components/my-ui/Notification";
import { Handshake, X } from "lucide-react";
import { LinkNotificationProps } from "../LinkNotification";
import { getTimeAgo } from "@/helpers/dateFormatter";
import { useSeeNotification } from "@/hooks/notificationHooks/useSeeNotification";

export default function LinkResponseNotification({
  notification,
}: LinkNotificationProps) {
  const seeNotification = useSeeNotification();

  const handleCloseNotification = () => {
    seeNotification.mutate(String(notification.id));
  };

  const timePassed = getTimeAgo(new Date(notification.createdAt));

  return (
    <>
      <div className="bg-border -mx-1 my-1 h-px" />
      <Notification.Root>
        <Notification.Icon icon={Handshake} className="w-4" />
        <Notification.Content>
          {`${notification.sender?.name} aceitou sua solicitação de acompanhamento`}
          <p className="text-xs text-muted-foreground mt-1">{timePassed}</p>
        </Notification.Content>
        <Notification.ActionButton variant="ghost" onClick={handleCloseNotification}>
          <X />
        </Notification.ActionButton>
      </Notification.Root>
    </>
  );
}

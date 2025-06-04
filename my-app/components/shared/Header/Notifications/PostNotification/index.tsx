
import { Notification } from "@/components/my-ui/Notification";
import { MessageSquare, ChevronRight } from "lucide-react";
import { NotificationType } from "../type";
interface PostNotificationProps {
  notification: NotificationType;
}

export default function PostNotification({
  notification,
}: PostNotificationProps) {

  return (
    <>
      <div className="bg-border -mx-1 my-1 h-px" />
      <Notification.Root>
        <Notification.Icon icon={MessageSquare} className="w-4" />
        <Notification.Content>
          {`${notification.sender?.name} fez uma nova postagem`}
        </Notification.Content>
        <Notification.ActionButton variant="ghost" className="cursor-pointer">
          <ChevronRight />
        </Notification.ActionButton>
      </Notification.Root>
    </>
  );
}

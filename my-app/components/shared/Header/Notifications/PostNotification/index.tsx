import { Notification } from "@/components/my-ui/Notification";
import { MessageSquare, ChevronUp, X } from "lucide-react";
import { NotificationType } from "../type";
import { Button } from "@/components/ui/button";
import { useSeeNotification } from "@/hooks/notificationHooks/useSeeNotification";
import PostViewModal from "./PostViewModal";
import { getTimeAgo } from "@/helpers/dateFormatter";
interface PostNotificationProps {
  notification: NotificationType;
}

export default function PostNotification({
  notification,
}: PostNotificationProps) {
  const seeNotification = useSeeNotification();

  const handleCloseNotification = () => {
    seeNotification.mutate(String(notification.id));
  };

  const timePassed = getTimeAgo(new Date(notification.createdAt));

  return (
    <>
      <div className="bg-border -mx-1 my-1 h-px" />
      <Notification.Root>
        <Notification.Icon icon={MessageSquare} className="w-4" />
        <Notification.Content>
          {`${notification.sender?.name} fez uma nova postagem`}
          <p className="text-xs text-muted-foreground mt-1">{timePassed}</p>
        </Notification.Content>
        <Notification.ActionsButton>
          <PostViewModal
            userId={notification.sender.id}
            postId={notification.resourceId!}
            postType={notification.type as "post" | "goal"}
            trigger={
              <Button variant="ghost">
                <ChevronUp />
              </Button>
            }
          />
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={handleCloseNotification}
          >
            <X />
          </Button>
        </Notification.ActionsButton>
      </Notification.Root>
    </>
  );
}

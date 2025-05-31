import { Notification } from "@/components/my-ui/Notification";
import { Button } from "@/components/ui/button";
import { Handshake, Check, X } from "lucide-react";
import { NotificationType } from "../type";
import useRespondRequest, {
  LinkRequestStatus,
} from "@/hooks/requestHooks/useRespondRequest";
interface LinkNotificationProps {
  notification: NotificationType;
}

export default function LinkNotification({
  notification,
}: LinkNotificationProps) {
  const respondRequest = useRespondRequest();

  const handleRequest = (status: LinkRequestStatus) => {
    respondRequest.mutate({
      requestId: String(notification.resourceId),
      status,
      userId: String(notification.receiver?.id),
    });
  };

  return (
    <>
      <div className="bg-border -mx-1 my-1 h-px" />
      <Notification.Root>
        <Notification.Icon icon={Handshake} className="w-4" />
        <Notification.Content>
          {`Solicitação de acompanhamento de ${notification.sender?.name}`}
        </Notification.Content>
        <Notification.ActionsButton>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => handleRequest(LinkRequestStatus.ACCEPTED)}
          >
            <Check className="text-sea-nymph-400" />
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => handleRequest(LinkRequestStatus.REJECTED)}
          >
            <X className="text-red-400" />
          </Button>
        </Notification.ActionsButton>
      </Notification.Root>
    </>
  );
}

import { Notification } from "@/components/my-ui/Notification";
import { MessageSquare, ChevronRight } from "lucide-react";

export default function PostNotification() {
  return (
    <>
      <div className="bg-border -mx-1 my-1 h-px" />
      <Notification.Root>
        <Notification.Icon icon={MessageSquare} className="w-4"/>
        <Notification.Content>
          Usuário fez uma nova postagem
        </Notification.Content>
        <Notification.ActionButton variant="ghost" className="cursor-pointer">
            <ChevronRight/>
        </Notification.ActionButton>
      </Notification.Root>
    </>
  );
}

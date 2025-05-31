import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import LinkNotification from "../LinkNotification";
import PostNotification from "../PostNotification";
import { useNotifications } from "@/hooks/notificationHooks/useNotification";

export default function AccordionNotification() {
  const { data: notifications, isLoading, isError } = useNotifications();

  const linkNotifications = notifications?.filter((n) => n.type === "link_request") || [];
  const postNotifications =
    notifications?.filter(
      (n) => n.type === "post" || n.type === "mood-log" || n.type === "goal"
    ) || [];

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="links">
        <AccordionTrigger className="text-xs font-semibold text-muted-foreground w-full py-3">
          Solicitações
        </AccordionTrigger>
        <AccordionContent>
          {isLoading && <div className="text-xs p-2">Carregando...</div>}
          {isError && (
            <div className="text-xs p-2 text-red-500">
              Erro ao carregar notificações
            </div>
          )}
          {linkNotifications.length === 0 && !isLoading && (
            <div className="text-xs p-2 text-muted-foreground">
              Nenhuma solicitação
            </div>
          )}
          {linkNotifications.map((notification) => (
            <LinkNotification key={notification.id} notification={notification} />
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="posts">
        <AccordionTrigger className="text-xs font-semibold text-muted-foreground w-full py-3">
          Postagens
        </AccordionTrigger>
        <AccordionContent>
          {isLoading && <div className="text-xs p-2">Carregando...</div>}
          {isError && (
            <div className="text-xs p-2 text-red-500">
              Erro ao carregar notificações
            </div>
          )}
          {postNotifications.length === 0 && !isLoading && (
            <div className="text-xs p-2 text-muted-foreground">
              Nenhuma postagem
            </div>
          )}
          {postNotifications.map((notification) => (
            <PostNotification key={notification.id} notification={notification} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

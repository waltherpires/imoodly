import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import LinkNotification from "../LinkNotification";
import PostNotification from "../PostNotification";

export default function AccordionNotification() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="links">
        <AccordionTrigger className="text-xs font-semibold text-muted-foreground w-full py-3">Solicitações</AccordionTrigger>
        <AccordionContent>
          <LinkNotification />
          <LinkNotification />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="posts">
        <AccordionTrigger className="text-xs font-semibold text-muted-foreground w-full py-3">Postagens</AccordionTrigger>
        <AccordionContent>
          <PostNotification />
          <PostNotification />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

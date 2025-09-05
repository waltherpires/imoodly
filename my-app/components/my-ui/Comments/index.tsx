import Comment from "./Comment";
import { MessageCircle  } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CommentsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: any[];
}

export default function Comments({ comments }: CommentsProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center gap-2 text-sm">
          <MessageCircle className="w-5" />
          {comments.length}
        </div>
      </DialogTrigger>
      <DialogContent className="rounded overflow-y-auto max-h-3/4 not-dark:bg-sea-nymph-300">
        <DialogHeader>
          <DialogTitle>Comentários</DialogTitle>
        </DialogHeader>
        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
          <Accordion type="single" collapsible className="w-100 mx-1">
            <AccordionItem value="comment">
              <AccordionTrigger
                className="flex justify-end"
                showChevron={false}
              >
                <h3>Adicionar comentário</h3>
              </AccordionTrigger>
              <AccordionContent className="flex items-start flex-col gap-2">
                <Input
                
                  min={10}
                  max={200}
                  className="min-w-20 min-h-20 max-w-90 not-dark:bg-white"
                />
                <Button variant="outline" className=" w-20">
                  Enviar
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}

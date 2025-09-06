/* eslint-disable @typescript-eslint/no-explicit-any */
import Comment from "./Comment";
import { MessageCircle } from "lucide-react";
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
import CommentForm from "./CreateComment";
import { EntityType } from "@/hooks/commentHooks/entityType";
import { Post } from "@/lib/api/diaryPost";
import { GoalProps } from "../Goal";
import PostResume from "./PostResume";
import { Button } from "@/components/ui/button";

interface CommentsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: {
    content: string;
    parentId?: number;
  }[];
  entityType: EntityType;
  entityId: number;
  entityTitle: string;
  entity: Post | GoalProps;
}

export default function Comments({
  comments = [],
  entityId,
  entityType,
  entity,
}: CommentsProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" className="flex items-center gap-2 text-sm">
          <MessageCircle className="w-5" />
          {comments.length}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded overflow-y-auto max-h-3/4 not-dark:bg-sea-nymph-300 ">
        <DialogHeader className="mt-2">
          {entityType === "post" && <PostResume post={entity as Post} />}
          <DialogTitle className="mt-3 bg-koromiko-400 p-1 rounded-sm text-black">Comentários</DialogTitle>
        </DialogHeader>
        <div>
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment: any) => (
              <Comment key={comment.id} {...comment} />
            ))
          ) : (
            <div className="h-8 not-dark:bg-gray-100 p-3 rounded text-center">
              <p className="text-sm">Nenhum comentário ainda</p>
            </div>
          )}
          <Accordion type="single" collapsible className="sm:w-80 mx-1">
            <AccordionItem value="comment">
              <AccordionTrigger
                className="flex justify-end"
                showChevron={false}
              >
                <h3>Adicionar comentário</h3>
              </AccordionTrigger>
              <AccordionContent className="flex items-start flex-col gap-2">
                <CommentForm entityId={entityId} entityType={entityType} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}

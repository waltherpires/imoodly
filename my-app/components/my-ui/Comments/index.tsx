import Comment from "./Comment";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        </div>
      </DialogContent>
    </Dialog>
  );
}

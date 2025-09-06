"use client";

import DiaryEditForm from "@/components/forms/EditDiaryRegisterForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Post } from "@/lib/api/diaryPost";
import { Pencil } from "lucide-react";
import { useState } from "react";

type Props = {
  post: Post;
};

export default function EditPostDialog({ post }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Pencil className="w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden"></DialogTitle>
        <DiaryEditForm
          data={post}
          moodLogId={post.id}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

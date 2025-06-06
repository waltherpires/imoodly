import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DiaryList from "@/components/sections/patients/PatientProfile/PatientView/DiaryList";
import GoalsList from "@/components/sections/patients/PatientProfile/PatientView/GoalsList";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type PostViewModalProps = {
  userId: number;
  postId: number;
  postType: "diary" | "goal";
  trigger: React.ReactNode;
};

export default function PostViewModal({
  userId,
  postId,
  postType,
  trigger,
}: PostViewModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const title = postType === "diary" ? "Nova Postagem" : "Nova Meta";

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent showCloseButton={false} className="not-dark:bg-sea-nymph-300 not-dark:border-sea-nymph-400">
          <DialogHeader className="flex flex-row justify-between items-center">
            <DialogTitle>{title}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost"><X /></Button>
            </DialogClose>
          </DialogHeader>
          <div>
            {postType === "diary" && (
              <DiaryList userId={String(userId)} postId={postId} />
            )}
            {postType === "goal" && (
              <GoalsList userId={String(userId)} goalId={postId} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="flex flex-col max-h-[90vh] pb-10 ">
        <DrawerHeader className="flex flex-row justify-between items-center mx-2">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerClose asChild><Button variant="ghost"><X /></Button></DrawerClose>
        </DrawerHeader>
        <div className="mx-3">
          {postType === "diary" && (
            <DiaryList userId={String(userId)} postId={postId} />
          )}
          {postType === "goal" && (
            <GoalsList userId={String(userId)} goalId={postId} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

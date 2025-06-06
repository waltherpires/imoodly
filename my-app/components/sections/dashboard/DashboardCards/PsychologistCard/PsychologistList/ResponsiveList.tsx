import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DialogTitle } from "@radix-ui/react-dialog";
import ListContent from "./ListContent";

export function ResponsivetList() {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="not-dark:bg-sea-nymph-400 not-dark:hover:bg-sea-nymph-300"
        >
          Buscar
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] pb-30">
        <DialogTitle className="hidden"></DialogTitle>
        <ListContent />
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="not-dark:bg-sea-nymph-400 not-dark:hover:bg-sea-nymph-300"
        >
          Buscar
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="min-w-3/4 sm:min-w-[200px] sm:max-w-3xl"
      >
        <DialogTitle className="hidden"></DialogTitle>
        <ListContent />
      </DialogContent>
    </Dialog>
  );
}

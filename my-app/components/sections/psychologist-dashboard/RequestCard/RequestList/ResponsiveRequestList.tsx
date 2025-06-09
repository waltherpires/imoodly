import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DialogTitle } from "@radix-ui/react-dialog";
import { RequestListContent } from "./RequestListContent";
import { ListProps } from "./RequestListContent";

type ResponsiveRequestListProps = ListProps;

export function ResponsiveRequestList(props: ResponsiveRequestListProps) {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="not-dark:bg-sea-nymph-400 not-dark:hover:bg-sea-nymph-300 not-last:mx-2"
        >
          Ver
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col max-h-[90vh] pb-10">
        <DialogTitle className="hidden"></DialogTitle>
        <RequestListContent {...props} />
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="not-dark:bg-sea-nymph-400 not-dark:hover:bg-sea-nymph-300 mx-2"
        >
          Ver
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="min-w-3/4 sm:min-w-[200px] sm:max-w-3xl"
      >
        <DialogTitle className="hidden"></DialogTitle>
        <RequestListContent {...props} />
      </DialogContent>
    </Dialog>
  );
}

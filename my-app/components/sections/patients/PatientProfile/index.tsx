/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import PatientProfileContent from "./PatientProfileContent";

type PatientDataProps = {
  patientData: any;
};

export default function PatientProfile({ patientData }: PatientDataProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="not-dark:bg-sea-nymph-500 not-dark:hover:bg-sea-nymph-400 cursor-pointer w-30 sm:w-15">
            Perfil
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-10/11 lg:max-w-4xl my-15">
          <DialogHeader>
            <DialogTitle>Perfil</DialogTitle>
          </DialogHeader>
          <PatientProfileContent patientData={patientData} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="not-dark:bg-sea-nymph-500 not-dark:hover:bg-sea-nymph-400 cursor-pointer w-30 sm:w-15">
          Perfil
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Perfil</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4 space-y-4">
          <PatientProfileContent patientData={patientData} />
          <DrawerClose asChild>
            <Button variant="outline" className="w-full my-6">
              Fechar
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}



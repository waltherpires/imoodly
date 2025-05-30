import { NavLink } from "@/components/my-ui/NavLink";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useServicesNavigation } from "../useServicesNavigation";

type SheetProps = {
  sheetOpen: boolean;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseSheet: () => void;
};

export default function SheetNoSession({
  sheetOpen,
  setSheetOpen,
  handleCloseSheet
}: SheetProps) {
  const router = useRouter();
  const { gotToServices } = useServicesNavigation();

  return (
    <div className="md:hidden">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle className="hidden sr-only"></SheetTitle>
          <nav className="flex flex-col gap-4 mt-6">
            <NavLink
              onClick={() => {
                router.push("/about");
                handleCloseSheet();
              }}
            >
              Sobre
            </NavLink>
            <NavLink
              onClick={() => {
                gotToServices();
                handleCloseSheet();
              }}
            >
              Serviços
            </NavLink>
            <NavLink
              onClick={() => {
                handleCloseSheet();
                router.push("/login");
              }}
            >
              Entrar
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

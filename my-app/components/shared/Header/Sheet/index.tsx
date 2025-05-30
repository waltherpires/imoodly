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
import { DefaultSession } from "next-auth";
import { PatientLinks } from "../PatientLinks";
import { PsychologistLinks } from "../PsychologistLinks";
import LogoutButton from "@/components/my-ui/LogoutButton";

type SheetProps = {
  sheetOpen: boolean;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseSheet: () => void;
  session: {
    user: {
      id: string;
      role: string;
      email: string;
      name: string;
    } & DefaultSession;
  };
};

export default function SheetSession({
  sheetOpen,
  setSheetOpen,
  handleCloseSheet,
  session,
}: SheetProps) {
  const router = useRouter();

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
            {session.user.role === "paciente" && (
              <PatientLinks onNavigate={handleCloseSheet} />
            )}
            {session.user.role === "psicologo" && (
              <PsychologistLinks onNavigate={handleCloseSheet} />
            )}
            <NavLink
              onClick={() => {
                handleCloseSheet();
                router.push("/profile");
              }}
            >
              Perfil
            </NavLink>
            <LogoutButton className="cursor-pointer font-semibold pl-8 text-sm py-2 rounded self-start" />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

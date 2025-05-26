"use client";

import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Menu } from "lucide-react";
import ThemeToggle from "../../my-ui/ThemeToggle";
import LogoutButton from "../../my-ui/LogoutButton";
import { NavLink } from "../../my-ui/NavLink";
import MyDropdown from "../../my-ui/MyDropdown";
import Link from "next/link";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useServicesNavigation } from "./useServicesNavigation";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const { gotToServices } = useServicesNavigation();
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleCloseSheet = () => setSheetOpen(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-[100%] border-b bg-[#abd1c6] dark:bg-zinc-950">
      <div className="flex items-center justify-between px-4 py-3 w-full mx-auto">
        <Link
          href="/"
          onClick={() => NProgress.start()}
          className="flex flex-row justify-center items-center gap-2 text-xl font-bold"
        >
          <Image alt="imoodly" src="/logo.svg" width={35} height={35} />
          iMoodly
        </Link>

        <div className="flex">
          {session && (
            <>
              <nav className="hidden md:flex gap-4">
                {session.user.role === "paciente" && (
                  <PatientLinks onNavigate={handleCloseSheet} />
                )}
                {session.user.role === "psicologo" && (
                  <PsychologistLinks onNavigate={handleCloseSheet} />
                )}
                <MyDropdown className="cursor-pointer" />
              </nav>

              <div className="md:hidden">
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
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
            </>
          )}
          {!session && (
            <>
              <nav className="hidden md:flex gap-4">
                <NavLink href="/about">Sobre</NavLink>
                <NavLink onClick={gotToServices}>Serviços</NavLink>
                <NavLink href="/login">Entrar</NavLink>
              </nav>

              <div className="md:hidden">
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                    >
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
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function PatientLinks({ onNavigate }: { onNavigate: () => void }) {
  const router = useRouter();

  return (
    <>
      <NavLink
        onClick={() => {
          router.push("/dashboard");
          onNavigate();
        }}
      >
        Dashboard
      </NavLink>
      <NavLink
        onClick={() => {
          router.push("/diary");
          onNavigate();
        }}
      >
        Diário
      </NavLink>
      <NavLink
        onClick={() => {
          router.push("/messages");
          onNavigate();
        }}
      >
        Mensagens
      </NavLink>
    </>
  );
}

function PsychologistLinks({ onNavigate }: { onNavigate: () => void }) {
  const router = useRouter();

  return (
    <>
      <NavLink
        onClick={() => {
          router.push("/dashboard");
          onNavigate();
        }}
      >
        Dashboard
      </NavLink>
      <NavLink
        onClick={() => {
          router.push("/patients");
          onNavigate();
        }}
      >
        Pacientes
      </NavLink>
      <NavLink
        onClick={() => {
          router.push("/messages");
          onNavigate();
        }}
      >
        Mensagens
      </NavLink>
    </>
  );
}

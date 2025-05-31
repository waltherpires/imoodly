"use client";

import { useSession } from "next-auth/react";

import ThemeToggle from "../../my-ui/ThemeToggle";
import { NavLink } from "../../my-ui/NavLink";
import MyDropdown from "../../my-ui/MyDropdown";
import Link from "next/link";
import { useServicesNavigation } from "./useServicesNavigation";
import Image from "next/image";
import { useState } from "react";
import { PsychologistLinks } from "./PsychologistLinks";
import { PatientLinks } from "./PatientLinks";
import Notifications from "./Notifications";
import SheetNoSession from "./Sheet/SheetNoSession";
import SheetSession from "./Sheet";

export default function Navbar() {
  const { data: session } = useSession();
  const { gotToServices } = useServicesNavigation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleCloseSheet = () => setSheetOpen(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-[100%] border-b bg-[#abd1c6] dark:bg-zinc-950">
      <div className="flex items-center justify-between px-4 py-3 w-full mx-auto">
        <Link
          href="/"
          className="flex flex-row justify-center items-center gap-2 text-xl font-bold"
        >
          <Image alt="imoodly" src="/logo.svg" width={35} height={35} />
          iMoodly
        </Link>

        <div className="flex">
          {session && (
            <nav className="hidden md:flex gap-2 mx-3">
              {session.user.role === "paciente" && <PatientLinks />}
              {session.user.role === "psicologo" && <PsychologistLinks />}
            </nav>
          )}
          {!session && (
            <nav className="hidden md:flex gap-4">
              <NavLink href="/about">Sobre</NavLink>
              <NavLink onClick={gotToServices}>Serviços</NavLink>
              <NavLink href="/login">Entrar</NavLink>
            </nav>
          )}
          {session && <Notifications />}
          {session && <MyDropdown className="hidden md:block cursor-pointer" />}
          <ThemeToggle />
          {session ? (
            <SheetSession
              sheetOpen={sheetOpen}
              setSheetOpen={setSheetOpen}
              handleCloseSheet={handleCloseSheet}
              session={session}
            />
          ) : (
            <SheetNoSession
              sheetOpen={sheetOpen}
              setSheetOpen={setSheetOpen}
              handleCloseSheet={handleCloseSheet}
            />
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import ThemeToggle from "./my-ui/ThemeToggle";
import LogoutButton from "./my-ui/LogoutButton";
import { NavLink } from "./my-ui/NavLink";
import MyDropdown from "./my-ui/MyDropdown";
import Link from "next/link";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="w-[100%] border-b">
      <div className="flex items-center justify-between px-4 py-3 w-full mx-auto">
        <Link
          href="/"
          onClick={() => NProgress.start()}
          className="text-xl font-bold"
        >
          iMoodly
        </Link>
        <div className="flex">
          {session && (
            <>
              <nav className="hidden md:flex gap-4">
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/diary">Diário</NavLink>
                <NavLink href="/messages">Mensagens</NavLink>
                <MyDropdown />
              </nav>

              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetTitle className="hidden sr-only"></SheetTitle>
                    <nav className="flex flex-col gap-4 mt-6">
                      <NavLink href="/dashboard">Dashboard</NavLink>
                      <NavLink href="/diary">Diário</NavLink>
                      <NavLink href="/messages">Mensagens</NavLink>
                      <NavLink href="/profile">Perfil</NavLink>
                      <LogoutButton className="font-semibold pl-8 text-sm py-2 rounded self-start" />
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
                <NavLink href="/services">Serviços</NavLink>
                <NavLink href="/login">Entrar</NavLink>
              </nav>

              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetTitle className="hidden sr-only"></SheetTitle>
                    <nav className="flex flex-col gap-4 mt-6">
                      <NavLink href="/about">Sobre</NavLink>
                      <NavLink href="/services">Serviços</NavLink>
                      <NavLink href="/login">Entrar</NavLink>
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

"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import ThemeToggle from "./my-ui/ThemeToggle";
import LogoutButton from "./my-ui/LogoutButton";
import MyDropdown from "./my-ui/MyDropdown";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <header className="w-full border-b">
      <div className="flex items-center justify-between px-4 py-3 ,ax-w-7xl mx-auto">
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
                <Link href="/dashboard" onClick={() => NProgress.start()}>
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/diary" onClick={() => NProgress.start()}>
                  <Button variant="ghost">Diário</Button>
                </Link>
                <Link href="/messages" onClick={() => NProgress.start()}>
                  <Button variant="ghost">Mensagens</Button>
                </Link>
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
                      <Link href="/dashboard" onClick={() => NProgress.start()}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/diary" onClick={() => NProgress.start()}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Diário
                        </Button>
                      </Link>
                      <Link href="/messages" onClick={() => NProgress.start()}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Mensagens
                        </Button>
                      </Link>
                      <Link href="/profile" onClick={() => NProgress.start()}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Perfil
                        </Button>
                      </Link>
                      <LogoutButton className="font-semibold pl-4 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 py-2 rounded" />
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          )}
          {!session && (
            <>
              <nav className="hidden md:flex gap-4">
                <Link href="/about" onClick={() => NProgress.start()}>
                  <Button variant="ghost" onClick={() => NProgress.start()}>
                    Sobre
                  </Button>
                </Link>
                <Link href="/services" onClick={() => NProgress.start()}>
                  <Button variant="ghost">Serviços</Button>
                </Link>
                <Link href="/login" onClick={() => NProgress.start()}>
                  <Button variant="ghost" className="w-full justify-start">
                    Entrar
                  </Button>
                </Link>
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
                      <Link href="/about" onClick={() => NProgress.start()}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Sobre
                        </Button>
                      </Link>
                      <Link href="/services" onClick={() => NProgress.start()}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Serviços
                        </Button>
                      </Link>
                      <Link href="/login" onClick={() => NProgress.start()}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Entrar
                        </Button>
                      </Link>
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

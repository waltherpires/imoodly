import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";


export default function Navbar() {
    return (
        <header className="w-full border-b">
            <div className="flex items-center justify-between px-4 py-3 ,ax-w-7xl mx-auto">
                <Link href="/" className="text-xl font-bold">iMoodly</Link>

                <nav className="hidden md:flex gap-4">
                    <Link href="/about">
                        <Button variant="ghost">Sobre</Button>
                    </Link>
                    <Link href="/services">
                        <Button variant="ghost">Serviços</Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="ghost">Criar Conta</Button>
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
                            <nav className="flex flex-col gap-4 mt-6">
                                <Link href="/about">
                                    <Button variant="ghost" className="w-full justify-start">Sobre</Button>
                                </Link>
                                <Link href="/services">
                                    <Button variant="ghost" className="w-full justify-start">Serviços</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button variant="ghost" className="w-full justify-start">Sobre</Button>
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
import Records from "@/components/sections/diary/Records";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DiaryPage() {
  return (
    <main className="flex-1">
      <div className="container py-6 md:py-8 mx-auto">
        <div className="flex flex-col md:flex-row  items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Diário</h1>
            <p className="text-muted-foreground dark:text-teal-50">
              Registre seus pensamentos e emoções
            </p>
          </div>
          <div className="mt-4 flex space-x-2 md:mt-0">
            <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
              <Plus className="mr-2 h-4 x-4" />
              Novo registro
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
            <Records />
        </div>
      </div>
    </main>
  );
}

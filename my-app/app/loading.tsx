import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex flex-1 h-screen pt-16 items-center justify-center">
      <div>
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    </main>
  );
}

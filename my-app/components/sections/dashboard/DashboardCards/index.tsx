import Link from "next/link";
import PredominantMoodCard from "./PredominantMoodCard";
import DiaryRecordsCard from "./DiaryRecordsCard";
import GoalsSummaryCard from "./GoalsSummaryCard";
import { getUserSession } from "@/lib/api/getUserSession";
import PsychologistCard from "./PsychologistCard";

export default async function DashboardCards() {
  const session = await getUserSession();
  const userId = session?.user.id;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-4 max-w-screen">
      <PsychologistCard userId={userId} />
      <PredominantMoodCard userId={userId} />
      <Link href="/diary">
        <DiaryRecordsCard userId={userId} />
      </Link>
      <GoalsSummaryCard userId={userId} />
    </section>
  );
}

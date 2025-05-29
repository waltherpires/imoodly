import Link from "next/link";
import PredominantMoodCard from "./PredominantMoodCard";
import DiaryRecordsCard from "./DiaryRecordsCard";
import GoalsSummaryCard from "./GoalsSummaryCard";
import { getUserSession } from "@/lib/api/getUserSession";
import PsychologistCard from "./PsychologistCard";
import { Suspense } from "react";
import CardSkeleton from "./CardSkeleton";

export default async function DashboardCards() {
  const session = await getUserSession();
  const userId = session?.user.id;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 xl:grid-cols-4 max-w-screen">
      <Suspense fallback={<CardSkeleton />}>
        <PsychologistCard userId={userId} />
      </Suspense>
      <Suspense fallback={<CardSkeleton />}>
        <PredominantMoodCard userId={userId} />
      </Suspense>

      <Link href="/diary">
        <Suspense fallback={<CardSkeleton />}>
          <DiaryRecordsCard userId={userId} />
        </Suspense>
      </Link>
      <Suspense fallback={<CardSkeleton />}>
        <GoalsSummaryCard userId={userId} />
      </Suspense>
    </section>
  );
}

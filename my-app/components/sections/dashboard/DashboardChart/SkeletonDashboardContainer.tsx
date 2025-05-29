import { Card } from "@/components/ui/card";
import SkeletonCard from "./SkeletonCard";

export default function SkeletonDashboardContainer() {
  return (
    <Card className="not-dark:bg-sea-nymph-100/60 flex flex-col sm:flex-row justify-center items-center space-y-5 sm:space-y-0 sm:space-x-5">
      <SkeletonCard />
      <SkeletonCard />
    </Card>
  );
}

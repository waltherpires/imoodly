import { usePosts } from "@/hooks/diaryHooks/usePosts";
import CardSkeleton from "@/components/sections/dashboard/DashboardCards/CardSkeleton";
import PostCard from "@/components/sections/diary/PostCard";

type DiaryListProps = {
  userId: string;
};

export default function DiaryList({ userId }: DiaryListProps) {
  const { data, isLoading } = usePosts(Number(userId));

  if (isLoading) return <CardSkeleton />;

  return (
    <div className="max-h-[400px] overflow-y-auto flex flex-col gap-4">
      {data && data.length > 0 ? (
        data.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p>Nenhuma postagem encontrada.</p>
      )}
    </div>
  );
}

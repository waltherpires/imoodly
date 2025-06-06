import { usePosts } from "@/hooks/diaryHooks/usePosts";
import CardSkeleton from "@/components/sections/dashboard/DashboardCards/CardSkeleton";
import PostCard from "@/components/sections/diary/PostCard";

type DiaryListProps = {
  userId: string;
  postId?: number;
};

export default function DiaryList({ userId, postId }: DiaryListProps) {
  const { data, isLoading } = usePosts(Number(userId));

  if (isLoading) return <CardSkeleton />;

  let filteredData = data;

  if (data && postId) {
    filteredData = data.filter((post) => post.id === postId);
  }

  return (
    <div className="max-h-[400px] overflow-y-auto flex flex-col gap-4">
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p>Nenhuma postagem encontrada.</p>
      )}
    </div>
  );
}

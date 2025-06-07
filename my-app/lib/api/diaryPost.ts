import { fetchClient } from "./fetchClient";

export type Tag = "feliz" | "triste" | "contente" | "ansioso" | "motivado";

export type Post = {
  id: number;
  title: string;
  description: string;
  tags: Tag[];
  date: string;
  userId: number;
};

export async function fetchPosts(userId?: number): Promise<Post[]> {
  const response = await fetchClient(`/mood-logs/user/${userId}`, {
    method: "GET",
  });

  const data = response.data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    tags: item.tags as Tag[],
    date: item.createdAt,
    userId: item.userId,
  }));
}

import api from "./axiosClient";

export type Tag = "feliz" | "triste" | "contente" | "ansioso" | "motivado";

export type Post = {
  id: number;
  title: string;
  description: string;
  tags: Tag[];
  date: string;
};

export async function fetchPosts(
  userId?: number,
): Promise<Post[]> {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

  if (useMock) {
    await new Promise((res) => setTimeout(res, 500));
    const allPosts: Post[] = [
      {
        id: 1,
        title: "Dia Produtivo",
        description:
          "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
        tags: ["feliz", "motivado"],
        date: "2025-04-17T14:30:00.000Z",
      },
      {
        id: 2,
        title: "Dia Produtivo",
        description:
          "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
        tags: ["feliz", "motivado"],
        date: "2025-04-17T14:30:00.000Z",
      },
    ];
    return allPosts;
  }

  const response = await api.get(`/mood-logs/user/${userId}`)

  console.log("response do fetchPosts: ", response)
  const data = response.data;  
  console.log("data do fetchPosts: ", data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((item: any, index: number) => ({
    id: index,
    title: item.title,
    description: item.description,
    tags: item.tags as Tag[],
    date: item.createdAt,
  }));
}

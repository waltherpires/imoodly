type Tag = "feliz" | "triste" | "contente" | "ansioso" | "motivado";

type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: Tag[];
};

export async function fetchPosts(): Promise<Post[]> {
  await new Promise((res) => setTimeout(res, 500));

  return [
    {
      id: "1",
      title: "Dia Produtivo",
      description:
        "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
      tags: ["feliz", "motivado"],
      date: "2025-04-17T14:30:00.000Z"
    },
  ];
}

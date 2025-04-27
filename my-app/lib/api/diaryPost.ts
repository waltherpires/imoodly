export type Tag = "feliz" | "triste" | "contente" | "ansioso" | "motivado";

export type Post = {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  date: string;
};

export async function fetchPosts(): Promise<Post[]> {
  await new Promise((res) => setTimeout(res, 500));

  const allPosts: Post[] = [
    {
      id: "1",
      title: "Dia Produtivo",
      description:
        "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
      tags: ["feliz", "motivado"],
      date: "2025-04-17T14:30:00.000Z"
    },
    {
      id: "2",
      title: "Dia Produtivo",
      description:
        "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
      tags: ["feliz", "motivado"],
      date: "2025-04-17T14:30:00.000Z"
    },
    {
      id: "3",
      title: "Dia Produtivo",
      description:
        "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
      tags: ["feliz", "motivado"],
      date: "2025-04-17T14:30:00.000Z"
    },
    {
      id: "4",
      title: "Dia Produtivo",
      description:
        "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
      tags: ["feliz", "motivado"],
      date: "2025-04-17T14:30:00.000Z"
    },
    {
      id: "5",
      title: "Dia Produtivo",
      description:
        "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
      tags: ["feliz", "motivado"],
      date: "2025-04-17T14:30:00.000Z"
    },
    {
      id: "6",
      title: "Dia Produtivo",
      description:
        "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
      tags: ["feliz", "motivado"],
      date: "2025-04-17T14:30:00.000Z"
    },
    {
      id: "7",
      title: "Dia Produtivo",
      description:
        "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
      tags: ["feliz", "motivado"],
      date: "2025-04-17T14:30:00.000Z"
    },
    {
      id: "8",
      title: "Dia Produtivo",
      description:
        "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
      tags: ["feliz", "motivado"],
      date: "2025-03-17T14:30:00.000Z"
    },
    {
      id: "9",
      title: "Dia Produtivo",
      description:
        "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
      tags: ["feliz", "motivado"],
      date: "2025-02-17T14:30:00.000Z"
    },
    {
      id: "10",
      title: "Dia Produtivo",
      description:
        "Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.",
      tags: ["feliz", "motivado"],
      date: "2025-01-17T14:30:00.000Z"
    },
  ];



  return allPosts;

}

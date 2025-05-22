export function getTagColor(tag: string) {
  switch (tag) {
    case "feliz":
      return "bg-green-500";
    case "motivado":
      return "bg-blue-500";
    case "triste":
      return "bg-red-500";
    case "contente":
      return "bg-yellow-500";
    case "ansioso":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
}

export const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

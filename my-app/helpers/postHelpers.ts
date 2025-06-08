export function getTagColor(tag: string) {
  switch (tag) {
    case "feliz":
      return "bg-[#FECD04]";
    case "calmo":
      return "bg-[#A7CF3A]";
    case "triste":
      return "bg-[#67C9D6]";
    case "ansioso":
      return "bg-[#F79534]";
    case "irritado":
      return "bg-[#E8546C]";
    case "confuso":
      return "bg-[#BB9FC8]"; 
    default:
      return "bg-gray-500";
  }
}

export const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

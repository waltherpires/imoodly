import { Post } from "@/lib/api/diaryPost";

export function dateFormatter(date: string | Date) {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    const formatoData = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).format(dateObj);
    
    return formatoData;
}

export function dateFormatterNoHours(date: string | Date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const formatoData = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
  
  return formatoData;
}

export const monthNamesInPortuguese: Record<string, string> = {
  January: "Janeiro",
  February: "Fevereiro",
  March: "Março",
  April: "Abril",
  May: "Maio",
  June: "Junho",
  July: "Julho",
  August: "Agosto",
  September: "Setembro",
  October: "Outubro",
  November: "Novembro",
  December: "Dezembro",
};

export const lastWeekRecords = (register: Post[]) => {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  return register.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate >= lastWeek && recordDate <= today;
  });
}

export const thisMonthRecords = (register: Post[]) => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  return register.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate >= firstDayOfMonth && recordDate <= today;
  });
}
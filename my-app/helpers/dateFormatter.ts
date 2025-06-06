import { Post } from "@/lib/api/diaryPost";

export function dateFormatter(date: string | Date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const formatoData = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(dateObj);

  return formatoData;
}

export function dateFormatterNoHours(date: string | Date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const formatoData = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
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
  today.setHours(0, 0, 0, 0);
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  return register.filter((record) => {
    const recordDate = new Date(record.date);
    recordDate.setHours(0, 0, 0, 0);
    return recordDate >= lastWeek && recordDate <= today;
  });
};

export const thisMonthRecords = (register: Post[]) => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return register.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate >= firstDayOfMonth && recordDate <= lastDayOfMonth;
  });
};

export const calculateAge = (birthDateDay: string | Date): number => {
  const today = new Date();
  const birthDate = new Date(birthDateDay);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const minEighteen = () => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  return maxDate;
};

export function getTimeAgo(createdAt: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000
  );

  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

  const divisions = [
    { amount: 60, name: "second" },
    { amount: 60, name: "minute" },
    { amount: 24, name: "hour" },
    { amount: 30, name: "day" },
    { amount: 12, name: "month" },
    { amount: Number.POSITIVE_INFINITY, name: "year" },
  ];

  let duration = diffInSeconds;
  let i = 0;

  while (duration >= divisions[i].amount && i < divisions.length - 1) {
    duration /= divisions[i].amount;
    i++;
  }

  const value = Math.floor(duration);
  const unit = divisions[i].name as Intl.RelativeTimeFormatUnit;

  return rtf.format(-value, unit);
}

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

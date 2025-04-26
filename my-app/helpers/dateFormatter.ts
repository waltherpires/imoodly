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

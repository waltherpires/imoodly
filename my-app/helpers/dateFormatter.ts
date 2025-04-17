export function dateFormatter(date: string) {
    const data = new Date(date);

    const formatoData = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).format(data);
    
    return formatoData;
}



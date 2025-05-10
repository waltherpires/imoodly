interface EmotionDataEntry {
  year: string;
  month: string;
  emotions: Record<string, string | number>;
}

const monthMapping: Record<string, string> = {
  janeiro: "january",
  fevereiro: "february",
  março: "march",
  abril: "april",
  maio: "may",
  junho: "june",
  julho: "july",
  agosto: "august",
  setembro: "september",
  outubro: "october",
  novembro: "november",
  dezembro: "december",
};

export function getPredominantEmotion(emotionData: EmotionDataEntry[]) {
  const currentMonth = new Date()
    .toLocaleString("pt-BR", { month: "long" })
    .trim();

  const currentMonthInEnglish = monthMapping[currentMonth];

  const currentMonthData = emotionData?.find((entry) => {
    const trimmedMonth = entry.month.trim().toLowerCase();
    return trimmedMonth === currentMonthInEnglish;
  });

  if (!currentMonthData || !currentMonthData.emotions) {
    console.log("Nenhum dado encontrado para o mês atual.");
    return { emotion: "Sem registros", percentage: "0" };
  }

  const predominantEmotion = Object.entries(currentMonthData.emotions).reduce<
    [string, number]
  >(
    (prev, curr) =>
      Number(curr[1]) > prev[1] ? [curr[0], Number(curr[1])] : prev,
    ["", 0]
  )[0];

  const totalEmotions = Object.values(currentMonthData.emotions).reduce<number>(
    (sum, value) => sum + Number(value),
    0
  );
  const predominantEmotionPercentage = totalEmotions
    ? (
        (Number(currentMonthData.emotions[predominantEmotion]) /
          totalEmotions) *
        100
      ).toFixed(1)
    : "0";

  return {
    emotion: predominantEmotion,
    percentage: predominantEmotionPercentage,
  };
}

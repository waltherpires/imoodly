// src/components/forms/EmotionSelector.tsx
import { Button } from "@/components/ui/button";
import { emotionOptions, Emotions } from "./formSchema";

type Props = {
  value: Emotions[];
  onChange: (value: Emotions[]) => void;
};

export default function EmotionSelector({ value, onChange }: Props) {
  function toggleEmotion(emotion: Emotions) {
    const isSelected = value.includes(emotion);
    const newValue = isSelected
      ? value.filter((e) => e !== emotion)
      : [...value, emotion];
    onChange(newValue);
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      {emotionOptions.map((emotion) => (
        <Button
          key={emotion.label}
          type="button"
          variant={value.includes(emotion.label) ? "default" : "outline"}
          onClick={() => toggleEmotion(emotion.label)}
          className={`${
            value.includes(emotion.label)
              ? "not-dark:bg-koromiko-200 not-dark:hover:bg-koromiko-300 not-dark:border-koromiko-500 not-dark:border-1 not-dark:text-black"
              : ""
          } cursor-pointer`}
        >
          {emotion.icon}
          <span className="ml-0.5">{emotion.label}</span>
        </Button>
      ))}
    </div>
  );
}

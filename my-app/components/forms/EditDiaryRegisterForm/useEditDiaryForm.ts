/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formSchema,
  FormDataDiaryRegister,
  Emotions,
} from "../DiaryRegisterForm/formSchema";
import { useEditMoodLog } from "@/hooks/diaryHooks/editPost";

export function useEditDiaryForm(
  moodLogId: number,
  data: any,
  onSuccess?: () => void
) {
  const form = useForm<FormDataDiaryRegister>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emotions: (data?.tags as Emotions[]) || [],
      title: data?.title || "",
      description: data?.description || "",
    },
  });

  const mutation = useEditMoodLog(onSuccess);

  function onSubmit(values: FormDataDiaryRegister) {
    mutation.mutate({ moodLogId, data: values });
  }

  return { form, onSubmit, mutation };
}

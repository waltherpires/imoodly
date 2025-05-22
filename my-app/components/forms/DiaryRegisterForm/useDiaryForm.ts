import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormDataDiaryRegister } from "./formSchema";
import { usePostForm } from "@/hooks/diaryHooks/usePostForm";
import { useSession } from "next-auth/react";

export function useDiaryForm() {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;

  const form = useForm<FormDataDiaryRegister>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emotions: [],
      title: "",
      description: "",
    },
  });

  const mutation = usePostForm(userId);

  function onSubmit(values: FormDataDiaryRegister) {
    mutation.mutate(values, {
      onSuccess: () => form.reset(),
    });
  }

  return { form, onSubmit, mutation };
}

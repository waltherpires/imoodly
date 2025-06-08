/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmotionSelector from "../DiaryRegisterForm/EmotionSelector";
import { useEditDiaryForm } from "./useEditDiaryForm";

type DiaryEditFormProps = {
  moodLogId: number;
  data: any;
  onSuccess?: () => void;
};

export default function DiaryEditForm({ moodLogId, data, onSuccess }: DiaryEditFormProps) {
  const { form, onSubmit, mutation } = useEditDiaryForm(moodLogId, data, onSuccess);

  return (
    <Card className="p-3 not-dark:bg-sea-nymph-100/60 my-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="emotions"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Humor</FormLabel>
                <EmotionSelector
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Dê um título para seu registro"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    maxLength={350}
                    className="bg-white"
                    placeholder="Descreva como você está se sentindo..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={mutation.isPending}
            className="self-end w-40 mt-2 not-dark:bg-koromiko-300 not-dark:hover:bg-koromiko-400"
            type="submit"
          >
            {mutation.isPending ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}

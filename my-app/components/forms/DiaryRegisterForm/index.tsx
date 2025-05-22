// src/components/forms/DiaryRegisterForm.tsx
"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDiaryForm } from "./useDiaryForm";
import EmotionSelector from "./EmotionSelector";

export default function DiaryRegisterForm() {
  const { form, onSubmit, mutation } = useDiaryForm();

  return (
    <Card className="p-3 not-dark:bg-sea-nymph-100/60">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="emotions"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Humor</FormLabel>
                <EmotionSelector value={field.value} onChange={field.onChange} />
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
                  <Input className="bg-white" placeholder="Dê um título para seu registro" {...field} />
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

"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { usePostForm } from "@/hooks/diaryHooks/usePostForm";
import { useSession } from "next-auth/react";

export enum Emotions {
  Feliz = "feliz",
  Triste = "triste",
  Irritado = "irritado",
  Ansioso = "ansioso",
  Calmo = "calmo",
  Confuso = "confuso",
}

export const emotionOptions = [
  { icon: "😊", label: Emotions.Feliz },
  { icon: "😔", label: Emotions.Triste },
  { icon: "😠", label: Emotions.Irritado },
  { icon: "😰", label: Emotions.Ansioso },
  { icon: "😌", label: Emotions.Calmo },
  { icon: "🤔", label: Emotions.Confuso },
];

export const formSchema = z.object({
  emotions: z
    .array(
      z.enum([
        Emotions.Feliz,
        Emotions.Triste,
        Emotions.Irritado,
        Emotions.Ansioso,
        Emotions.Calmo,
        Emotions.Confuso,
      ])
    )
    .min(1, "Escolha pelo menos um humor"),
  title: z
    .string()
    .min(1, { message: "Informe um título" })
    .max(30, { message: "Título muito grande!" }),
  description: z
    .string()
    .min(4, { message: "Informe uma descrição" })
    .max(350, { message: "Descrição muito longa!" }),
  tags: z.array(z.string()).optional(),
});

export type FormDataDiaryRegister = z.infer<typeof formSchema>;

export default function DiaryRegisterForm() {
  const { data: sessionData } = useSession();  
  const userId = sessionData?.user.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emotions: [],
      title: "",
      description: "",
    },
  });

  const mutation = usePostForm(userId);

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <div>
      <Card className="p-3 not-dark:bg-[#abd1c6]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <FormField
              control={form.control}
              name="emotions"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Humor</FormLabel>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {emotionOptions.map((emotion) => (
                      <Button
                        className="cursor-pointer"
                        key={emotion.label}
                        type="button"
                        variant={
                          field.value.includes(emotion.label)
                            ? "default"
                            : "outline"
                        }
                        onClick={() => {
                          const isSelected = field.value.includes(
                            emotion.label
                          );
                          const newValue = isSelected
                            ? field.value.filter(
                                (item) => item !== emotion.label
                              )
                            : [...field.value, emotion.label];
                          field.onChange(newValue);
                        }}
                      >
                        <span>
                          {emotion.icon}
                          <span className="ml-0.5">{emotion.label}</span>
                        </span>
                      </Button>
                    ))}
                  </div>
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
              {mutation.isPending ? "Enviando... " : "Enviar"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}

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

const formSchema = z.object({
  mood: z.array(z.string()).min(1, "Escolha pelo menos um humor"),
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

export default function DiaryRegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: [],
      title: "",
      description: "",

    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card className="p-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Humor</FormLabel>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {[
                    {icon: "😊" , label: "Feliz"},
                    {icon: "😔" , label: "Triste"},
                    {icon: "😠", label: "Irritado"},
                    {icon: "😰" , label: "Ansioso"},
                    {icon: "😌", label: "Calmo"},
                    {icon: "🤔", label: "Confuso"},
                  ].map((mood) => (
                    <Button
                      key={mood.label}
                      type="button"
                      variant={field.value.includes(mood.label) ? "default" : "outline"}
                      onClick={() => {
                        const isSelected = field.value.includes(mood.label);
                        const newValue = isSelected
                          ? field.value.filter((item) => item !== mood.label)
                          : [...field.value, mood.label];
                          field.onChange(newValue);
                      }}
                    >
                      <span>{mood.icon}<span className="ml-0.5">{mood.label}</span></span>
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
                  <Textarea maxLength={350} placeholder="Descreva como você está se sentindo..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="self-end w-40 mt-2 bg-teal-500" type="submit">Enviar</Button>
        </form>
      </Form>
    </Card>
  );
}

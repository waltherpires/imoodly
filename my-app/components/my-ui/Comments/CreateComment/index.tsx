"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formSchema, FormSchema } from "./form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useCreateComment from "./useCreateComment";
import { Textarea } from "@/components/ui/textarea";

export default function CommentForm({
  entityType,
  entityId,
  parentId,
}: Partial<FormSchema>) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entityType: entityType,
      entityId: entityId,
      content: "",
      parentId,
    },
  });

  const createComment = useCreateComment();

  async function onSubmit(values: FormSchema) {
    createComment.mutate(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Input type="hidden" {...form.register("entityType")} />
        <Input
          type="hidden"
          {...(form.register("entityId"), { valueasnumber: "true" })}
        />
        {parentId && (
          <Input
            type="hidden"
            {...(form.register("parentId"), { valueasnumber: "true" })}
          />
        )}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  minLength={10}
                  maxLength={300}
                  className="min-w-70 sm:w-80 min-h-20  not-dark:bg-white resize-none text-wrap"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline" className="w-20">
          Enviar
        </Button>
      </form>
    </Form>
  );
}

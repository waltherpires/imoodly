"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Informe seu nome" }),
  birthdate: z
    .string()
    .min(1, { message: "Informe sua data de nascimento" })
    .refine((val) => !isNaN(Date.parse(val)), { message: "Data inválida" }),
  email: z.string().email({ message: "Email inválido" }),
});

export type FormDataEditProfile = z.infer<typeof formSchema>;

export default function EditProfileForm({
  userData,
  onSubmit,
  onClose,
}: {
  userData: FormDataEditProfile;
  onSubmit: (values: FormDataEditProfile) => void;
  onClose: () => void;
}) {
  const form = useForm<FormDataEditProfile>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.name,
      birthdate: userData.birthdate,
      email: userData.email,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              form.reset();
              onClose(); 
            }}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="default">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}

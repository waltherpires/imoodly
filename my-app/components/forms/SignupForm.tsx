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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Nome muito curto" }),
    birthDate: z.string().min(1, { message: "Data de nascimento obrigatória" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
      .max(50),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function SignupFom() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      birthDate: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // adicionar integração backend
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  className="mb-3"
                  placeholder="Digite seu nome completo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <Input className="mb-3" type="date" {...field} />
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
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  className="mb-5"
                  placeholder="Digite seu e-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  className="mb-3"
                  type="password"
                  placeholder="Digite sua nova senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>COnfirmar Senha</FormLabel>
              <FormControl>
                <Input
                  className="mb-3"
                  type="password"
                  placeholder="Confirme sua senha"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="self-end flex justify-end mt-2">
          <p className="self-end text-xs pl-1">
            Já possui uma conta?
            <Link href="/login" className="rounded-sm mr-2 p-1 text-teal-500">
              Entre aqui!
            </Link>
          </p>
          <Button
            className="self-end bg-teal-500 dark:bg-teal-300 dark:hover:bg-teal-500 hover:bg-teal-700"
            type="submit"
          >
            Registrar
          </Button>
        </div>
      </form>
    </Form>
  );
}

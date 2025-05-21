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
import Link from "next/link";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { signIn } from "next-auth/react";
import { ButtonWithLoading } from "../my-ui/ButtonLoading";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .max(50),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    setError(null);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
      redirect: false,
    });

    if (result?.error) {
      setLoading(false);
      NProgress.done();
      setError("Email ou senha inválidos");
      return;
    }

    if (result?.ok) {
      window.location.href = result.url || "/dashboard";
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="self-end flex justify-end mt-2">
          <p className="self-end text-xs pl-1">
            Não possui uma conta?
            <Link
              href="/signup"
              onClick={() => NProgress.start()}
              className="rounded-sm mr-2 p-1 text-teal-500"
            >
              Crie uma aqui!
            </Link>
          </p>
          <ButtonWithLoading
            className="cursor-pointer self-end bg-aqua-deep-500 dark:bg-aqua-deep-300 dark:hover:bg-aqua-deep-500 hover:bg-aqua-deep-700"
            type="submit"
            loading={loading}
          >
            Entrar
          </ButtonWithLoading>
        </div>
      </form>
    </Form>
  );
}

'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres"}).max(50),
})

export default function LoginForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // adicionar integração backend
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-100">E-mail</FormLabel>
              <FormControl>
                <Input className="bg-neutral-50" placeholder="Digite seu e-mail" {...field}/>
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
              <FormLabel className="text-neutral-100">Senha</FormLabel>
              <FormControl>
                <Input className="bg-neutral-50" type="password" placeholder="Digite sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm text-neutral-50">Não possui uma conta?<Link href="/signup" className="rounded-sm ml-1 px-1 text-black bg-neutral-100 hover:bg-neutral-300" >Crie uma aqui!</Link> </p>
        <Button className="text-black self-end bg-neutral-100 hover:bg-neutral-300" type="submit">Entrar</Button>
      </form>
    </Form>
  );
}

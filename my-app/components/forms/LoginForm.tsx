'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/useAuth";

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres"}).max(50),
})

export default function LoginForm() {
  const router = useRouter();
  const { setUserId } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // adicionar integração backend
  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
    .post('/api/login', {
      email: values.email,
      password: values.password,
    })
    .then(() => {
      return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        withCredentials: true,
      });
    })
    .then((res) => {
      setUserId(res.data.id);
      router.replace('/dashboard');
    })
    .catch(() => {
      console.log('Erro ao fazer login');
    });
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
                <Input placeholder="Digite seu e-mail" {...field}/>
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
                <Input type="password" placeholder="Digite sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="self-end flex justify-end mt-2">
        <p className="self-end text-xs pl-1">Não possui uma conta?<Link href="/signup" className="rounded-sm mr-2 p-1 text-teal-500" >Crie uma aqui!</Link> </p>
        <Button className="self-end bg-teal-500 dark:bg-teal-300 dark:hover:bg-teal-500 hover:bg-teal-700" type="submit">Entrar</Button>
        </div>

      </form>
    </Form>
  );
}

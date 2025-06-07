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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { useSignup } from "@/hooks/authHooks/useSignup";
import { ButtonWithLoading } from "../my-ui/ButtonLoading";
import { calculateAge, minEighteen } from "@/helpers/dateFormatter";
import { signIn } from "next-auth/react";

export const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nome muito curto" })
      .regex(/^[\p{L}\p{N} ]+$/u, {
        message: "Nome não pode conter caracteres especiais ou emojis",
      }),
    birthdate: z
      .string()
      .min(1, { message: "Data de nascimento obrigatória" })
      .refine((val) => !isNaN(Date.parse(val)), { message: "Data inválida" })
      .refine(
        (val) => {
          const date = new Date(val);
          return date.getFullYear() >= 1910;
        },
        { message: "Ano de nascimento não pode ser anterior a 1910" }
      )
      .refine(
        (val) => {
          const date = new Date(val);
          return calculateAge(date) >= 18;
        },
        { message: "Você precisa ter pelo menos 18 anos" }
      ),
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
      .max(50)
      .regex(/^[\p{L}\p{N} .'-]+$/u, {
        message: "Senha inválida",
      }),
    confirmPassword: z.string(),
    role: z.enum(["paciente", "psicologo"]),
    crp: z
      .string()
      .regex(/^\d{4,6}\/[A-Z]{2}(-\d{2})?$/, {
        message: "CRP inválido. Ex: 12345/CE ou 123456/SP-01",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.role === "psicologo" && !data.crp) {
        return false;
      }
      return true;
    },
    {
      message: "CRP obrigatório para psicólogos",
      path: ["crp"],
    }
  );

export default function SignupForm() {
  const { mutate: signup, isPending } = useSignup();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      birthdate: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "paciente",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signup(values, {
      onSuccess: async () => {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/dashboard",
          redirect: false,
        });

        if (result?.ok) {
          window.location.href = result.url || "/dashboard";
        }
      }
    });
  }

  return (
    <LazyMotion features={domAnimation}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    min="1910-01-01"
                    max={minEighteen()}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3">
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
                <FormLabel>Confirmar Senha</FormLabel>
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
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de cadastro</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                  >
                    <SelectTrigger className="w-full mb-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paciente">Usuário</SelectItem>
                      <SelectItem value="psicologo">Psicólogo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <AnimatePresence>
            {form.watch("role") === "psicologo" && (
              <m.div
                initial={{ opacity: 0, y: -20, zIndex: -1 }}
                animate={{
                  opacity: [0, 0.3, 1],
                  y: [-20, 5, 0],
                  zIndex: [-1, 0.5, 1],
                }}
                exit={{ opacity: [1, 0.3, 0], y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="crp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CRP</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu CRP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </m.div>
            )}
          </AnimatePresence>
          <div className="self-end flex justify-end mt-2">
            <p className="self-end text-xs pl-1">
              Já possui uma conta?
              <Link href="/login" className="rounded-sm mr-2 p-1 text-teal-500">
                Entre aqui!
              </Link>
            </p>
            <ButtonWithLoading
              loading={isPending}
              className="cursor-pointer self-end bg-sea-nymph-400 dark:bg-aqua-deep-300 dark:hover:bg-aqua-deep-500 hover:bg-sea-nymph-300"
              type="submit"
            >
              Registrar
            </ButtonWithLoading>
          </div>
        </form>
      </Form>
    </LazyMotion>
  );
}

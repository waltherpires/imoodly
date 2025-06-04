import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { ButtonWithLoading } from "../my-ui/ButtonLoading";

export const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Informe o título." })
    .regex(/^[\p{L}\p{N} '-,]*$/u, {
      message: "Não são permitidos caracteres especiais ou emojis",
    }),
  description: z
    .string()
    .max(100, { message: "Informe uma descrição menor." })
    .regex(/^[\p{L}\p{N} '-,]*$/u, {
      message: "Não são permitidos caracteres especiais ou emojis",
    })
    .optional(),
  dueDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Data inválida",
    }),
  totalSteps: z
    .number()
    .optional()
    .refine((val) => val === undefined || val > 0, {
      message: "O total de etapas deve ser maior que 0",
    }),
});

export type FormDataCreateGoal = z.infer<typeof formSchema>;

type CreateGoalProps = {
  onSubmit: (data: FormDataCreateGoal) => void;
  onClose: () => void;
};

export default function CreateGoal({ onSubmit, onClose }: CreateGoalProps) {
  const form = useForm<FormDataCreateGoal>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      totalSteps: undefined,
    },
  });

  const handleSubmit = (data: FormDataCreateGoal) => {
    onSubmit(data);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título*</FormLabel>
              <FormControl>
                <Input placeholder="Nome da meta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Breve descrição da meta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prazo</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="totalSteps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passos</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Quantidade de passos para cumprir a meta"
                  value={field.value?.toString() ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? undefined : Number(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2 justify-end items-center">
          <Button
            onClick={handleClose}
            className="cursor-pointer bg-red-500 hover:bg-red-700 text-white"
          >
            Cancelar
          </Button>
          <ButtonWithLoading
            className="cursor-pointer not-dark:bg-koromiko-300 not-dark:hover:bg-koromiko-400"
            type="submit"
          >
            Salvar Meta
          </ButtonWithLoading>
        </div>
      </form>
    </Form>
  );
}

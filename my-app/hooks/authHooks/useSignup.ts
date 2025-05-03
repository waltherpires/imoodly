import { formSchema } from "@/components/forms/SignupForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";

type signupProps = z.infer<typeof formSchema>;

const signup = async (props: signupProps) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
    props
  );
  return response.data;
};

export function useSignup() {
  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Cadastrado com sucesso!");
    },
    onError: () => {
      toast.error("Falha ao cadastrar!");
    },
  });

  return mutation;
}

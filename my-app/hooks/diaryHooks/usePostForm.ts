import { useMutation } from '@tanstack/react-query';
import { FormDataDiaryRegister } from '@/components/forms/DiaryRegisterForm';

function simularEnvio(dados: FormDataDiaryRegister): Promise<{ message: string }> {
    return new Promise ((resolve) => {
        setTimeout(() => {
            console.log("Simulando envio:", dados);
            resolve({ message: "Dados enviados com sucesso!" });
        }, 2000);
    });
}

export function usePostForm() {
    const mutation = useMutation({
        mutationFn: simularEnvio,
        onSuccess: (data) => {
            alert(data.message);
        },
        onError: (error) => {
            alert("Erro ao enviar: " + error.message);
        },
    });

    return mutation;
}
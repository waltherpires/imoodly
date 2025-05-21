"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/lib/api/authMe";
import ClientEditButton from "@/components/my-ui/EditButton";
import { Skeleton } from "@/components/ui/skeleton";
import { dateFormatterNoHours } from "@/helpers/dateFormatter";

export default function ProfilePage() {
  const { data: user, isPending, isError } = useUser();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-5">
          <CardHeader>
            <CardTitle>Carregando...</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-full mb-4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="bg-aqua-deep-50 dark:bg-aqua-deep-950 flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md p-5">
          <CardHeader>
            <CardTitle>Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Erro ao carregar os dados do usuário.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const birthdate = dateFormatterNoHours(user.birthdate);

  return (
    <main className="flex items-center justify-center min-h-screen bg-aqua-deep-50 dark:bg-aqua-deep-950 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full space-x-5">
        <div className="text-center md:text-start md:self-start mt-10 mb-10 w-full max-w-xs">
          <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
          <p className="text-muted-foreground dark:text-teal-50">
            Gerencie suas informações pessoais.
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <ClientEditButton user={user} />
          </div>
        </div>
        <Card className="w-full max-w-sm">
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Nome
                </p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Data de Nascimento
                </p>
                <p className="text-lg font-semibold">{birthdate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

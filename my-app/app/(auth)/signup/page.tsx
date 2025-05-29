import SignupForm from "@/components/forms/SignupForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="pt-16 bg-aqua-deep-50 dark:bg-aqua-deep-950 flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md p-5">
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Preencha os campos e crie sua conta!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}

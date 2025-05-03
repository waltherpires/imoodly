"use client";
import LoginForm from "@/components/forms/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="bg-teal-50 dark:bg-teal-950 flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md p-5">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Digite suas credenciais e entre!</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

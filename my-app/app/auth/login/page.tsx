import LoginForm from "@/components/forms/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full bg-neutral-800 max-w-md p-5">
        <CardHeader>
          <CardTitle className="text-neutral-100">Login</CardTitle>
          <CardDescription className="text-neutral-100">Digite suas credenciais e entre!</CardDescription>
        </CardHeader>
        <CardContent>

      <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

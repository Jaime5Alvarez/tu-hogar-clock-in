import { Card } from "@/components/ui/card";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/app/login/page-components/login-form";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export default async function Login() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (session) {
    redirect("/")
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            TU HOGAR CLOCK IN
          </CardTitle>
          <CardDescription className="text-center">
            Haz login para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}

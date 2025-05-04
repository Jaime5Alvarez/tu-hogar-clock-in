"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  notes: z.string().optional(),
  clockType: z.enum(["in", "out", ""]),
});

export default function Home() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
      clockType: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.clockType === "") {
      form.setError("clockType", {
        type: "manual",
        message: "Debes seleccionar un tipo de fichaje",
      });
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/clock", {
        method: "POST",
        body: JSON.stringify({
          notes: values.notes ? values.notes : null,
          clockType: values.clockType,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        form.reset();
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message ||
            "Error al registrar el fichaje, por favor intente nuevamente.",
        );
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Un error ha ocurrido, por favor intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Registrar fichaje
          </CardTitle>
          <CardDescription className="text-center">
            Sistema de control de horas de trabajo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6">
            <div className="space-y-2 flex flex-col items-center">
              <div className="text-center text-3xl font-medium">
                {currentTime ? (
                  currentTime.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                ) : (
                  <Skeleton className="w-40 h-10" />
                )}
              </div>
              <div className="text-center text-sm text-muted-foreground">
                {currentTime ? (
                  currentTime.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                ) : (
                  <Skeleton className="w-52 h-10" />
                )}
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="clockType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Tipo de fichaje</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in" id="in" />
                            <label
                              htmlFor="in"
                              className="text-sm font-medium leading-none cursor-pointer"
                            >
                              Entrada
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="out" id="out" />
                            <label
                              htmlFor="out"
                              className="text-sm font-medium leading-none cursor-pointer"
                            >
                              Salida
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas (opcional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Añade alguna nota sobre tu registro"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Registrando...</span>
                    </div>
                  ) : (
                    "Registrar fichaje"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {successMessage && (
            <div
              className="text-center text-sm p-2 rounded-md bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 w-full"
              dangerouslySetInnerHTML={{ __html: successMessage }}
            />
          )}
          {errorMessage && (
            <div className="text-center text-sm p-2 rounded-md bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 w-full">
              {errorMessage}
            </div>
          )}
        </CardFooter>
      </Card>

      <Button
        variant="link"
        onClick={() => router.push("/clock-history")}
        className="mt-4 cursor-pointer"
      >
        Historial de registros
      </Button>
    </main>
  );
}

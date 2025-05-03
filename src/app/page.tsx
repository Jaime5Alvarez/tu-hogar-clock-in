"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
  notes: z.string().optional(),
});

export default function Home() {
  const [isClockingIn, setIsClockingIn] = useState(true);
  const [clockedStatus, setClockedStatus] = useState<null | "in" | "out">(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setClockedStatus(isClockingIn ? "in" : "out");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isClockingIn ? "Registrar Entrada" : "Registrar Salida"}
          </CardTitle>
          <CardDescription className="text-center">
            Sistema de control de horas de trabajo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant={isClockingIn ? "default" : "outline"}
                onClick={() => setIsClockingIn(true)}
              >
                Entrada
              </Button>
              <Button 
                variant={!isClockingIn ? "default" : "outline"}
                onClick={() => setIsClockingIn(false)}
              >
                Salida
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="text-center text-lg font-medium">
                {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-center text-sm text-muted-foreground">
                {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Añade alguna nota sobre tu registro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  {isClockingIn ? "Registrar Entrada" : "Registrar Salida"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {clockedStatus && (
            <div className="text-center text-sm p-2 rounded-md bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 w-full">
              {clockedStatus === "in" ? "¡Entrada registrada con éxito!" : "¡Salida registrada con éxito!"}
            </div>
          )}
        </CardFooter>
      </Card>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="link" className="mt-4">
              Historial de registros
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Próximamente disponible</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </main>
  );
}

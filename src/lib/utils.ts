import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// Función para calcular el tiempo total entre entrada y salida
export const calculateTotalTime = (clockIn: string, clockOut: string | null): string => {
  if (!clockOut) return "-";
  console.log(clockIn, clockOut);
  
  const startTime = new Date(clockIn);
  const endTime = new Date(clockOut);
  
  // Calcular la diferencia en milisegundos
  const diffMs = endTime.getTime() - startTime.getTime();
  
  // Convertir a horas y minutos
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  console.log(hours, minutes);
  return `${hours}h ${minutes}m`;
};
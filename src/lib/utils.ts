import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//function come from shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

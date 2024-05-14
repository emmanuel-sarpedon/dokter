import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function handleResults(res: Response) {
  if (!res.ok) throw new Error();
  const { results } = await res.json();

  return results;
}

export function removeDuplicate(acc: string[], curr: string) {
  if (!curr) return acc;
  if (acc.includes(curr)) return acc;
  return [...acc, curr];
}

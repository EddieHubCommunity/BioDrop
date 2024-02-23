import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function classNames(...inputs) {
  return twMerge(clsx(inputs));
}

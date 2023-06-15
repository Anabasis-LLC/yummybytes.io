// 3rd party
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn
 *
 * https://ui.shadcn.com/docs/installation#add-a-cn-helper
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

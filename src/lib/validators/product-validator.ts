// Importing the `z` object from the `zod` library.
// Zod is a TypeScript-first schema declaration and validation library.
import { z } from 'zod';

// Define available size options as a constant array and mark them as a literal tuple using `as const`.
// This ensures TypeScript treats each value as its own literal type, not just a string.
export const AVAILABLE_SIZES = ['S', 'M', 'L'] as const;

// Define available color options similarly.
export const AVAILABLE_COLORS = [
  'white',
  'beige',
  'green',
  'purple',
  'blue',
] as const;

// Define sorting options for product filtering.
export const AVAILABLE_SORT = ['none', 'price-asc', 'price-desc'] as const;

// Create a schema using Zod to validate product filter input.
// - `size`: must be an array of valid sizes ('S', 'M', or 'L').
// - `color`: must be an array of valid colors from AVAILABLE_COLORS.
// - `sort`: must be one of the predefined sort values.
// - `price`: must be a tuple (array of fixed length 2) with two numbers representing price range.
export const ProductFilterValidator = z.object({
  size: z.array(z.enum(AVAILABLE_SIZES)), // e.g., ['S', 'M']
  color: z.array(z.enum(AVAILABLE_COLORS)), // e.g., ['green', 'blue']
  sort: z.enum(AVAILABLE_SORT), // e.g., 'price-asc'

  //   price will be between 2 number it can be anything
  price: z.tuple([z.number(), z.number()]), // e.g., [100, 500]
});

// Create a TypeScript type from the above Zod schema using `z.infer`,
// but omit the original `price` key from the type, as we want to customize it.
export type ProductState = Omit<
  z.infer<typeof ProductFilterValidator>, // Inferred type from schema
  'price' // Remove `price` from the type
> & {
  // Redefine `price` as an object with:
  // - `isCustom`: boolean indicating if user selected a custom price range
  // - `range`: tuple with the same structure as before ([minPrice, maxPrice])
  //we are overriding the price and helping to add custom property
  price: { isCustom: boolean; range: [number, number] };
};

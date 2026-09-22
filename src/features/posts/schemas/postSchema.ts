import { z } from 'zod'

/**
 * Esquema del formulario de post. Si se pasan los nombres válidos de Pokémon,
 * se comprueba que el Pokémon etiquetado exista en PokeAPI.
 */
export function createPostSchema(pokemonNames?: ReadonlySet<string>) {
  return z.object({
    userId: z.coerce.number<string>('Selecciona un autor').int().positive('Selecciona un autor'),
    title: z
      .string()
      .trim()
      .min(5, 'El título debe tener al menos 5 caracteres')
      .max(100, 'El título no puede superar 100 caracteres'),
    body: z
      .string()
      .trim()
      .min(20, 'El contenido debe tener al menos 20 caracteres')
      .max(1000, 'El contenido no puede superar 1000 caracteres'),
    pokemon: z
      .string()
      .trim()
      .toLowerCase()
      .refine((name) => !name || !pokemonNames || pokemonNames.has(name), {
        message: 'Ese Pokémon no existe en la Pokédex',
      })
      .transform((name) => name || null),
  })
}

export const postSchema = createPostSchema()

/** Valores del formulario (lo que se escribe) y datos validados (lo que se envía). */
export type PostFormValues = z.input<typeof postSchema>
export type PostInput = z.output<typeof postSchema>

import { z } from 'zod'

export const postSchema = z.object({
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
  userId: z.coerce.number<string>('Selecciona un autor').int().positive('Selecciona un autor'),
})

/** Valores del formulario (lo que se escribe) y datos validados (lo que se envía). */
export type PostFormValues = z.input<typeof postSchema>
export type PostInput = z.output<typeof postSchema>

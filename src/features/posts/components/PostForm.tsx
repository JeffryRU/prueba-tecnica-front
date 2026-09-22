import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { controlClass, FormField } from '@/shared/components/form/FormField'
import { Button } from '@/shared/components/ui/Button'
import { useGetUsersQuery } from '../api/postsApi'
import { postSchema, type PostFormValues, type PostInput } from '../schemas/postSchema'

type PostFormProps = {
  defaultValues?: Partial<PostFormValues>
  submitLabel: string
  isSubmitting?: boolean
  onSubmit: (data: PostInput) => void | Promise<unknown>
  onCancel?: () => void
}

const emptyValues: PostFormValues = { title: '', body: '', userId: '' }

/** Formulario de post reutilizable para crear y editar, validado con Zod. */
export function PostForm({
  defaultValues,
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
}: PostFormProps) {
  const { data: users = [], isLoading: loadingUsers } = useGetUsersQuery()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormValues, unknown, PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: { ...emptyValues, ...defaultValues },
    mode: 'onTouched',
  })
  const bodyLength = useWatch({ control, name: 'body' })?.length ?? 0

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <FormField label="Autor" error={errors.userId?.message}>
        {(field) => (
          <select
            {...field}
            {...register('userId')}
            disabled={loadingUsers}
            className={controlClass}
          >
            <option value="">{loadingUsers ? 'Cargando autores…' : 'Selecciona un autor'}</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} (@{user.username})
              </option>
            ))}
          </select>
        )}
      </FormField>

      <FormField label="Título" error={errors.title?.message}>
        {(field) => (
          <input
            {...field}
            {...register('title')}
            placeholder="Mi Pokémon favorito"
            className={controlClass}
          />
        )}
      </FormField>

      <FormField
        label="Contenido"
        error={errors.body?.message}
        hint={`${bodyLength}/1000 caracteres`}
      >
        {(field) => (
          <textarea
            {...field}
            {...register('body')}
            rows={6}
            placeholder="Cuéntanos por qué…"
            className={`${controlClass} resize-y`}
          />
        )}
      </FormField>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}

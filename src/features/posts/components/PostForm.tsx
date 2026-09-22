import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useGetPokemonIndexQuery } from '@/features/pokemon/api/pokemonApi'
import { formatName } from '@/features/pokemon/utils/pokemon'
import { useGetUsersQuery } from '@/features/users/api/usersApi'
import { controlClass, FormField } from '@/shared/components/form/FormField'
import { Button } from '@/shared/components/ui/Button'
import { createPostSchema, type PostFormValues, type PostInput } from '../schemas/postSchema'

type PostFormProps = {
  defaultValues?: Partial<PostFormValues>
  submitLabel: string
  isSubmitting?: boolean
  onSubmit: (data: PostInput) => void | Promise<unknown>
  onCancel?: () => void
}

const emptyValues: PostFormValues = { userId: '', title: '', body: '', pokemon: '' }

/** Formulario de post reutilizable para crear y editar, validado con Zod. */
export function PostForm({
  defaultValues,
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
}: PostFormProps) {
  const { data: users = [], isLoading: loadingUsers } = useGetUsersQuery()
  const { data: pokemonIndex } = useGetPokemonIndexQuery()
  const pokemonNames = useMemo(
    () => (pokemonIndex ? new Set(pokemonIndex.map((pokemon) => pokemon.name)) : undefined),
    [pokemonIndex],
  )

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormValues, unknown, PostInput>({
    // El esquema valida el Pokémon contra la Pokédex en cuanto se carga el índice.
    resolver: (values, context, options) =>
      zodResolver(createPostSchema(pokemonNames))(values, context, options),
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

      <FormField
        label="Pokémon relacionado (opcional)"
        error={errors.pokemon?.message}
        hint="Escribe para buscar en la Pokédex"
      >
        {(field) => (
          <>
            <input
              {...field}
              {...register('pokemon')}
              list="pokemon-options"
              autoComplete="off"
              placeholder="pikachu"
              className={controlClass}
            />
            <datalist id="pokemon-options">
              {pokemonIndex?.map((pokemon) => (
                <option key={pokemon.id} value={pokemon.name} label={formatName(pokemon.name)} />
              ))}
            </datalist>
          </>
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

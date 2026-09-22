import { describe, expect, it } from 'vitest'
import { createPostSchema } from './postSchema'

const valid = {
  userId: '3',
  title: 'Mi equipo ideal',
  body: 'Un texto con más de veinte caracteres.',
  pokemon: '',
}

describe('postSchema', () => {
  it('convierte el autor a número y el Pokémon vacío a null', () => {
    expect(createPostSchema().parse(valid)).toEqual({ ...valid, userId: 3, pokemon: null })
  })

  it('exige autor, título y contenido con longitudes mínimas', () => {
    const result = createPostSchema().safeParse({
      userId: '',
      title: 'Hola',
      body: 'corto',
      pokemon: '',
    })
    expect(result.success).toBe(false)
    const fields = result.error!.issues.map((issue) => issue.path[0])
    expect(fields).toEqual(['userId', 'title', 'body'])
  })

  it('valida el Pokémon contra la Pokédex cuando se conoce', () => {
    const schema = createPostSchema(new Set(['pikachu']))
    expect(schema.parse({ ...valid, pokemon: ' Pikachu ' }).pokemon).toBe('pikachu')
    expect(schema.safeParse({ ...valid, pokemon: 'agumon' }).success).toBe(false)
  })
})

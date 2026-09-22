import { describe, expect, it } from 'vitest'
import { partnerPokemonId } from './partner'

describe('partnerPokemonId', () => {
  it('asigna siempre el mismo Pokémon a cada usuario', () => {
    expect(partnerPokemonId(1)).toBe(25)
    expect(partnerPokemonId(1)).toBe(partnerPokemonId(1))
  })

  it('reparte Pokémon distintos entre los 10 usuarios y repite el ciclo', () => {
    const ids = Array.from({ length: 10 }, (_, i) => partnerPokemonId(i + 1))
    expect(new Set(ids).size).toBe(10)
    expect(partnerPokemonId(11)).toBe(partnerPokemonId(1))
  })
})

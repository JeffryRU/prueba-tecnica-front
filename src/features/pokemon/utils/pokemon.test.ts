import { describe, expect, it } from 'vitest'
import { matchesQuery } from '../hooks/usePokemonSearch'
import { formatName, formatPokemonNumber, idFromUrl, isPokemonType } from './pokemon'

describe('utilidades de Pokémon', () => {
  it('extrae el id de una URL de PokeAPI', () => {
    expect(idFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25)
  })

  it('formatea número y nombre', () => {
    expect(formatPokemonNumber(7)).toBe('#0007')
    expect(formatName('mr-mime')).toBe('Mr Mime')
  })

  it('reconoce los 18 tipos', () => {
    expect(isPokemonType('fire')).toBe(true)
    expect(isPokemonType('shadow')).toBe(false)
  })
})

describe('matchesQuery', () => {
  const pikachu = { id: 25, name: 'pikachu' }
  const mrMime = { id: 122, name: 'mr-mime' }

  it('busca por nombre parcial sin distinguir mayúsculas', () => {
    expect(matchesQuery(pikachu, 'PIKA')).toBe(true)
    expect(matchesQuery(pikachu, 'char')).toBe(false)
  })

  it('busca por número con o sin # y ceros a la izquierda', () => {
    expect(matchesQuery(pikachu, '25')).toBe(true)
    expect(matchesQuery(pikachu, '#025')).toBe(true)
  })

  it('acepta espacios en nombres compuestos', () => {
    expect(matchesQuery(mrMime, 'mr mime')).toBe(true)
  })

  it('una búsqueda vacía coincide con todo', () => {
    expect(matchesQuery(pikachu, '  ')).toBe(true)
  })
})

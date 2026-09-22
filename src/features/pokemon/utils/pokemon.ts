import type { PokemonTypeName } from '../types/pokemon'

/** Pokédex nacional: se excluyen formas alternativas (ids 10001+). */
export const MAX_POKEMON_ID = 1025

/** Extrae el id numérico de una URL de PokeAPI (…/pokemon/25/ → 25). */
export function idFromUrl(url: string): number {
  return Number(url.split('/').filter(Boolean).pop())
}

export function artworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function formatPokemonNumber(id: number): string {
  return `#${String(id).padStart(4, '0')}`
}

/** "mr-mime" → "Mr Mime" */
export function formatName(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export const POKEMON_TYPES: Record<PokemonTypeName, { label: string; className: string }> = {
  normal: { label: 'Normal', className: 'bg-type-normal' },
  fire: { label: 'Fuego', className: 'bg-type-fire' },
  water: { label: 'Agua', className: 'bg-type-water' },
  grass: { label: 'Planta', className: 'bg-type-grass' },
  electric: { label: 'Eléctrico', className: 'bg-type-electric' },
  ice: { label: 'Hielo', className: 'bg-type-ice' },
  fighting: { label: 'Lucha', className: 'bg-type-fighting' },
  poison: { label: 'Veneno', className: 'bg-type-poison' },
  ground: { label: 'Tierra', className: 'bg-type-ground' },
  flying: { label: 'Volador', className: 'bg-type-flying' },
  psychic: { label: 'Psíquico', className: 'bg-type-psychic' },
  bug: { label: 'Bicho', className: 'bg-type-bug' },
  rock: { label: 'Roca', className: 'bg-type-rock' },
  ghost: { label: 'Fantasma', className: 'bg-type-ghost' },
  dragon: { label: 'Dragón', className: 'bg-type-dragon' },
  dark: { label: 'Siniestro', className: 'bg-type-dark' },
  steel: { label: 'Acero', className: 'bg-type-steel' },
  fairy: { label: 'Hada', className: 'bg-type-fairy' },
}

export function isPokemonType(name: string): name is PokemonTypeName {
  return name in POKEMON_TYPES
}

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

export const POKEMON_TYPES: Record<
  PokemonTypeName,
  { label: string; className: string; softClassName: string }
> = {
  normal: { label: 'Normal', className: 'bg-type-normal', softClassName: 'bg-type-normal/15' },
  fire: { label: 'Fuego', className: 'bg-type-fire', softClassName: 'bg-type-fire/15' },
  water: { label: 'Agua', className: 'bg-type-water', softClassName: 'bg-type-water/15' },
  grass: { label: 'Planta', className: 'bg-type-grass', softClassName: 'bg-type-grass/15' },
  electric: {
    label: 'Eléctrico',
    className: 'bg-type-electric',
    softClassName: 'bg-type-electric/15',
  },
  ice: { label: 'Hielo', className: 'bg-type-ice', softClassName: 'bg-type-ice/15' },
  fighting: { label: 'Lucha', className: 'bg-type-fighting', softClassName: 'bg-type-fighting/15' },
  poison: { label: 'Veneno', className: 'bg-type-poison', softClassName: 'bg-type-poison/15' },
  ground: { label: 'Tierra', className: 'bg-type-ground', softClassName: 'bg-type-ground/15' },
  flying: { label: 'Volador', className: 'bg-type-flying', softClassName: 'bg-type-flying/15' },
  psychic: { label: 'Psíquico', className: 'bg-type-psychic', softClassName: 'bg-type-psychic/15' },
  bug: { label: 'Bicho', className: 'bg-type-bug', softClassName: 'bg-type-bug/15' },
  rock: { label: 'Roca', className: 'bg-type-rock', softClassName: 'bg-type-rock/15' },
  ghost: { label: 'Fantasma', className: 'bg-type-ghost', softClassName: 'bg-type-ghost/15' },
  dragon: { label: 'Dragón', className: 'bg-type-dragon', softClassName: 'bg-type-dragon/15' },
  dark: { label: 'Siniestro', className: 'bg-type-dark', softClassName: 'bg-type-dark/15' },
  steel: { label: 'Acero', className: 'bg-type-steel', softClassName: 'bg-type-steel/15' },
  fairy: { label: 'Hada', className: 'bg-type-fairy', softClassName: 'bg-type-fairy/15' },
}

export function isPokemonType(name: string): name is PokemonTypeName {
  return name in POKEMON_TYPES
}

export const STAT_LABELS: Record<string, string> = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Especial',
  'special-defense': 'Def. Especial',
  speed: 'Velocidad',
}

/** Valor base máximo de una estadística en los juegos. */
export const MAX_BASE_STAT = 255

/** Decímetros → metros y hectogramos → kilogramos. */
export const formatHeight = (decimeters: number) => `${(decimeters / 10).toFixed(1)} m`
export const formatWeight = (hectograms: number) => `${(hectograms / 10).toFixed(1)} kg`

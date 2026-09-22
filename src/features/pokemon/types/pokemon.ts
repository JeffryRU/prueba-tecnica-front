export type PokemonTypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'

/** Entrada del índice: lo mínimo para listar y buscar. */
export type PokemonSummary = { id: number; name: string }

export type PokemonStat = { name: string; value: number }

export type Pokemon = {
  id: number
  name: string
  image: string
  types: PokemonTypeName[]
  height: number // decímetros
  weight: number // hectogramos
  baseExperience: number | null
  abilities: { name: string; hidden: boolean }[]
  stats: PokemonStat[]
  speciesId: number
}

/** Respuestas crudas de PokeAPI (solo los campos usados). */
export type NamedResource = { name: string; url: string }

export type PokemonListResponse = { count: number; results: NamedResource[] }

export type TypeResponse = { name: string; pokemon: { pokemon: NamedResource }[] }

export type PokemonResponse = {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number | null
  types: { slot: number; type: NamedResource }[]
  abilities: { ability: NamedResource; is_hidden: boolean }[]
  stats: { base_stat: number; stat: NamedResource }[]
  species: NamedResource
  sprites: {
    front_default: string | null
    other?: { 'official-artwork'?: { front_default: string | null } }
  }
}

export type PokemonSpecies = {
  genus: string | null
  description: string | null
  evolutionChainId: number | null
  isLegendary: boolean
  isMythical: boolean
}

/** Etapas de evolución: cada etapa puede tener varias ramas (p. ej. Eevee). */
export type EvolutionStage = PokemonSummary[]

type LocalizedText = { language: { name: string } }

export type SpeciesResponse = {
  genera: ({ genus: string } & LocalizedText)[]
  flavor_text_entries: ({ flavor_text: string } & LocalizedText)[]
  evolution_chain: { url: string } | null
  is_legendary: boolean
  is_mythical: boolean
}

export type ChainLink = { species: NamedResource; evolves_to: ChainLink[] }

export type EvolutionChainResponse = { chain: ChainLink }

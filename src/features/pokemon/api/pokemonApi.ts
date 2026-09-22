import { pokeApi } from '@/shared/api/pokeApi'
import type {
  ChainLink,
  EvolutionChainResponse,
  EvolutionStage,
  Pokemon,
  PokemonSpecies,
  SpeciesResponse,
  PokemonListResponse,
  PokemonResponse,
  PokemonSummary,
  TypeResponse,
} from '../types/pokemon'
import { artworkUrl, idFromUrl, isPokemonType, MAX_POKEMON_ID } from '../utils/pokemon'

const ONE_HOUR = 60 * 60

const toSummaries = (resources: { name: string; url: string }[]): PokemonSummary[] =>
  resources
    .map(({ name, url }) => ({ id: idFromUrl(url), name }))
    .filter(({ id }) => id <= MAX_POKEMON_ID)

function toPokemon(raw: PokemonResponse): Pokemon {
  return {
    id: raw.id,
    name: raw.name,
    image:
      raw.sprites.other?.['official-artwork']?.front_default ??
      raw.sprites.front_default ??
      artworkUrl(raw.id),
    types: raw.types
      .sort((a, b) => a.slot - b.slot)
      .map(({ type }) => type.name)
      .filter(isPokemonType),
    height: raw.height,
    weight: raw.weight,
    baseExperience: raw.base_experience,
    abilities: raw.abilities.map(({ ability, is_hidden }) => ({
      name: ability.name,
      hidden: is_hidden,
    })),
    stats: raw.stats.map(({ stat, base_stat }) => ({ name: stat.name, value: base_stat })),
    speciesId: idFromUrl(raw.species.url),
  }
}

/** Prefiere español y, si no existe, inglés. */
function localized<T extends { language: { name: string } }>(entries: T[]): T | undefined {
  return (
    entries.find((entry) => entry.language.name === 'es') ??
    entries.find((entry) => entry.language.name === 'en')
  )
}

function toSpecies(raw: SpeciesResponse): PokemonSpecies {
  return {
    genus: localized(raw.genera)?.genus ?? null,
    description: localized(raw.flavor_text_entries)?.flavor_text.replace(/\s+/g, ' ') ?? null,
    evolutionChainId: raw.evolution_chain ? idFromUrl(raw.evolution_chain.url) : null,
    isLegendary: raw.is_legendary,
    isMythical: raw.is_mythical,
  }
}

/** Recorre el árbol de evolución por niveles: [[bulbasaur], [ivysaur], [venusaur]]. */
function toStages(root: ChainLink): EvolutionStage[] {
  const stages: EvolutionStage[] = []
  let level = [root]
  while (level.length) {
    stages.push(toSummaries(level.map((link) => link.species)))
    level = level.flatMap((link) => link.evolves_to)
  }
  return stages.filter((stage) => stage.length > 0)
}

export const pokemonApi = pokeApi.injectEndpoints({
  endpoints: (build) => ({
    /** Índice completo (nombre + id). PokeAPI no busca por texto parcial: se filtra en cliente. */
    getPokemonIndex: build.query<PokemonSummary[], void>({
      query: () => `pokemon?limit=${MAX_POKEMON_ID}`,
      transformResponse: (response: PokemonListResponse) => toSummaries(response.results),
      keepUnusedDataFor: ONE_HOUR,
    }),

    /** Ids de los Pokémon de un tipo. */
    getPokemonIdsByType: build.query<number[], string>({
      query: (type) => `type/${type}`,
      transformResponse: (response: TypeResponse) =>
        toSummaries(response.pokemon.map(({ pokemon }) => pokemon)).map(({ id }) => id),
      keepUnusedDataFor: ONE_HOUR,
    }),

    getPokemon: build.query<Pokemon, string | number>({
      query: (nameOrId) => `pokemon/${nameOrId}`,
      transformResponse: toPokemon,
      keepUnusedDataFor: ONE_HOUR,
    }),

    getPokemonSpecies: build.query<PokemonSpecies, number>({
      query: (id) => `pokemon-species/${id}`,
      transformResponse: toSpecies,
      keepUnusedDataFor: ONE_HOUR,
    }),

    getEvolutionChain: build.query<EvolutionStage[], number>({
      query: (id) => `evolution-chain/${id}`,
      transformResponse: (response: EvolutionChainResponse) => toStages(response.chain),
      keepUnusedDataFor: ONE_HOUR,
    }),
  }),
})

export const {
  useGetPokemonIndexQuery,
  useGetPokemonIdsByTypeQuery,
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
  useGetEvolutionChainQuery,
} = pokemonApi

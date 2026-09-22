import { pokeApi } from '@/shared/api/pokeApi'
import type {
  Pokemon,
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
  }),
})

export const { useGetPokemonIndexQuery, useGetPokemonIdsByTypeQuery, useGetPokemonQuery } =
  pokemonApi

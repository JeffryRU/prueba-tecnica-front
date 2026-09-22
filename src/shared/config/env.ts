export const env = {
  pokeApiUrl: import.meta.env.VITE_POKE_API_URL ?? 'https://pokeapi.co/api/v2',
  jsonPlaceholderApiUrl:
    import.meta.env.VITE_JSON_PLACEHOLDER_API_URL ?? 'https://jsonplaceholder.typicode.com',
} as const

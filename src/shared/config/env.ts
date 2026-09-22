export const env = {
  rickAndMortyApiUrl:
    import.meta.env.VITE_RICK_AND_MORTY_API_URL ?? 'https://rickandmortyapi.com/api',
  jsonPlaceholderApiUrl:
    import.meta.env.VITE_JSON_PLACEHOLDER_API_URL ?? 'https://jsonplaceholder.typicode.com',
} as const

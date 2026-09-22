export type Post = {
  id: number
  userId: number
  title: string
  body: string
  /** Pokémon etiquetado (nombre en PokeAPI). Solo en posts creados o editados en la app. */
  pokemon?: string | null
}

export type Comment = { id: number; postId: number; name: string; email: string; body: string }

export type PostFilters = { page: number; userId?: number; q?: string }

export type PostsPage = { items: Post[]; total: number }

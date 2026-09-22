import { Link } from 'react-router'
import { POSTS_PAGE_SIZE } from '@/features/posts/api/postsApi'
import { PostCard } from '@/features/posts/components/PostCard'
import { usePosts } from '@/features/posts/hooks/usePosts'
import { usePostsParams } from '@/features/posts/hooks/usePostsParams'
import { useGetUsersQuery } from '@/features/users/api/usersApi'
import { controlClass } from '@/shared/components/form/FormField'
import { Button } from '@/shared/components/ui/Button'
import { Pagination } from '@/shared/components/ui/Pagination'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { StatusMessage } from '@/shared/components/ui/StatusMessage'
import { getErrorMessage } from '@/shared/api/errors'
import { useDebouncedSync } from '@/shared/hooks/useDebouncedSync'

export function PostsPage() {
  const [params, updateParams] = usePostsParams()
  const [search, setSearch] = useDebouncedSync(params.q, (q) => updateParams({ q }))
  const { data: users = [] } = useGetUsersQuery()
  const { data, isLoading, isFetching, error, refetch } = usePosts({
    page: params.page,
    userId: params.userId || undefined,
    q: params.q || undefined,
  })
  const totalPages = Math.ceil((data?.total ?? 0) / POSTS_PAGE_SIZE)

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Publicaciones</h1>
          <p className="text-slate-600">
            Posts de JSONPlaceholder con autores que tienen su propio Pokémon compañero.
          </p>
        </div>
        <Link
          to="/posts/new"
          className="bg-brand-600 hover:bg-brand-700 inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors"
        >
          + Nueva publicación
        </Link>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row" role="search">
        <label className="flex-1">
          <span className="sr-only">Buscar publicaciones</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar en títulos y contenido…"
            className={controlClass}
          />
        </label>
        <label>
          <span className="sr-only">Filtrar por autor</span>
          <select
            value={params.userId || ''}
            onChange={(event) => updateParams({ userId: Number(event.target.value) || 0 })}
            className={`${controlClass} sm:w-56`}
          >
            <option value="">Todos los autores</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? (
        <StatusMessage
          tone="error"
          title="No pudimos cargar las publicaciones"
          description={getErrorMessage(error)}
          action={<Button onClick={refetch}>Reintentar</Button>}
        />
      ) : isLoading || !data ? (
        <div className="grid gap-4 md:grid-cols-2" aria-busy="true">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-52 rounded-2xl" />
          ))}
        </div>
      ) : data.items.length === 0 ? (
        <StatusMessage
          title="No hay publicaciones"
          description="Prueba con otra búsqueda o autor."
          action={
            <Button variant="secondary" onClick={() => updateParams({ q: '', userId: 0 })}>
              Limpiar filtros
            </Button>
          }
        />
      ) : (
        <>
          <p className="text-sm text-slate-500" aria-live="polite">
            {data.total} publicaciones · página {params.page} de {Math.max(totalPages, 1)}
          </p>
          <ul
            className={`grid gap-4 transition-opacity md:grid-cols-2 ${isFetching ? 'opacity-60' : ''}`}
          >
            {data.items.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
          <Pagination
            page={params.page}
            totalPages={totalPages}
            onPageChange={(page) => {
              updateParams({ page })
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        </>
      )}
    </section>
  )
}

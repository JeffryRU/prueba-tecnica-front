import { useNavigate, useParams } from 'react-router'
import { PokemonTag } from '@/features/pokemon/components/PokemonTag'
import { CommentsList } from '@/features/posts/components/CommentsList'
import { PostActions } from '@/features/posts/components/PostActions'
import { usePost } from '@/features/posts/hooks/usePosts'
import { AuthorCard } from '@/features/users/components/AuthorCard'
import { BackLink } from '@/shared/components/ui/BackLink'
import { Card } from '@/shared/components/ui/Card'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { PostNotFound } from './PostNotFound'

export function PostDetailPage() {
  const id = Number(useParams().id)
  const { post, isLoading, isNotFound, isError } = usePost(id)
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]" aria-busy="true">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
      </div>
    )
  }
  if (isNotFound || isError || !post) return <PostNotFound error={isError} />

  return (
    <article className="animate-fade-in space-y-6">
      <BackLink fallback="/posts" label="Volver a publicaciones" />
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <Card className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h1 className="text-2xl font-extrabold tracking-tight first-letter:uppercase sm:text-3xl">
                {post.title}
              </h1>
              <PostActions post={post} onDeleted={() => navigate('/posts')} />
            </div>
            {post.pokemon && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                Pokémon relacionado: <PokemonTag name={post.pokemon} />
              </div>
            )}
            <p className="whitespace-pre-line text-slate-700 first-letter:uppercase">{post.body}</p>
          </Card>
          <Card title="Comentarios">
            <CommentsList postId={post.id} />
          </Card>
        </div>
        <AuthorCard userId={post.userId} />
      </div>
    </article>
  )
}

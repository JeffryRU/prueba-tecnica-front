import { Link } from 'react-router'
import { PokemonTag } from '@/features/pokemon/components/PokemonTag'
import { AuthorAvatar } from '@/features/users/components/AuthorAvatar'
import { isLocalPost } from '../store/postsSlice'
import type { Post } from '../types/post'
import { PostActions } from './PostActions'

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="animate-fade-in flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <AuthorAvatar userId={post.userId} />
        {isLocalPost(post.id) && (
          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
            Creado en la app
          </span>
        )}
      </div>
      <Link to={`/posts/${post.id}`} className="group flex-1 space-y-2">
        <h2 className="group-hover:text-brand-600 line-clamp-2 text-lg font-bold first-letter:uppercase">
          {post.title}
        </h2>
        <p className="line-clamp-3 text-sm text-slate-600 first-letter:uppercase">{post.body}</p>
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {post.pokemon ? <PokemonTag name={post.pokemon} /> : <span />}
        <PostActions post={post} />
      </div>
    </article>
  )
}

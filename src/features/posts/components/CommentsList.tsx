import { Skeleton } from '@/shared/components/ui/Skeleton'
import { useGetPostCommentsQuery } from '../api/postsApi'
import { isLocalPost } from '../store/postsSlice'

export function CommentsList({ postId }: { postId: number }) {
  const local = isLocalPost(postId)
  const {
    data: comments = [],
    isLoading,
    isError,
  } = useGetPostCommentsQuery(postId, { skip: local })

  if (local) return <p className="text-sm text-slate-500">Aún no hay comentarios.</p>
  if (isLoading) return <Skeleton className="h-24" />
  if (isError) return <p className="text-sm text-red-600">No se pudieron cargar los comentarios.</p>

  return (
    <ul className="divide-y divide-slate-100">
      {comments.map((comment) => (
        <li key={comment.id} className="space-y-1 py-4 first:pt-0 last:pb-0">
          <p className="text-sm font-semibold first-letter:uppercase">{comment.name}</p>
          <p className="text-xs text-slate-500">{comment.email}</p>
          <p className="text-sm text-slate-700 first-letter:uppercase">{comment.body}</p>
        </li>
      ))}
    </ul>
  )
}

import { Link } from 'react-router'
import { ConfirmDialog } from '@/shared/components/ui/ConfirmDialog'
import { useDeletePost } from '../hooks/useDeletePost'
import type { Post } from '../types/post'

const actionClass =
  'rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand-600'

/** Botones Editar / Eliminar con diálogo de confirmación. */
export function PostActions({ post, onDeleted }: { post: Post; onDeleted?: () => void }) {
  const deletion = useDeletePost(onDeleted)

  return (
    <div className="flex gap-1">
      <Link
        to={`/posts/${post.id}/edit`}
        className={`${actionClass} text-slate-600 hover:bg-slate-100`}
      >
        Editar
      </Link>
      <button
        type="button"
        onClick={() => deletion.request(post)}
        className={`${actionClass} text-red-600 hover:bg-red-50`}
      >
        Eliminar
      </button>
      {deletion.target && (
        <ConfirmDialog
          open
          title="¿Eliminar publicación?"
          description={`Se eliminará "${post.title}". Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          isConfirming={deletion.isLoading}
          onConfirm={deletion.confirm}
          onCancel={deletion.cancel}
        />
      )}
    </div>
  )
}

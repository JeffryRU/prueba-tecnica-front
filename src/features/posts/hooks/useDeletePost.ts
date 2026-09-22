import { useState } from 'react'
import { useNotify } from '@/features/notifications/hooks/useNotify'
import { useDeletePostMutation } from '../api/postsApi'
import type { Post } from '../types/post'

/** Flujo de eliminación con confirmación y notificación de éxito. */
export function useDeletePost(onDeleted?: () => void) {
  const [target, setTarget] = useState<Post | null>(null)
  const [deletePost, { isLoading }] = useDeletePostMutation()
  const toast = useNotify()

  const confirm = async () => {
    if (!target) return
    const result = await deletePost(target)
    setTarget(null)
    // Los errores ya los notifica el listener global de mutations.
    if (!('error' in result)) {
      toast.success('Publicación eliminada')
      onDeleted?.()
    }
  }

  return { target, request: setTarget, cancel: () => setTarget(null), confirm, isLoading }
}

import { Link } from 'react-router'
import { StatusMessage } from '@/shared/components/ui/StatusMessage'

export function PostNotFound({ error = false }: { error?: boolean }) {
  return (
    <StatusMessage
      tone={error ? 'error' : 'neutral'}
      title={error ? 'No pudimos cargar la publicación' : 'La publicación no existe'}
      description={
        error ? 'Inténtalo de nuevo en unos segundos.' : 'Puede que haya sido eliminada.'
      }
      action={
        <Link to="/posts" className="text-brand-600 font-medium hover:underline">
          Ver todas las publicaciones
        </Link>
      }
    />
  )
}

import { useNavigate } from 'react-router'
import { useNotify } from '@/features/notifications/hooks/useNotify'
import { useCreatePostMutation } from '@/features/posts/api/postsApi'
import { PostForm } from '@/features/posts/components/PostForm'
import { BackLink } from '@/shared/components/ui/BackLink'
import { Card } from '@/shared/components/ui/Card'

export function NewPostPage() {
  const [createPost, { isLoading }] = useCreatePostMutation()
  const navigate = useNavigate()
  const toast = useNotify()

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <BackLink fallback="/posts" label="Volver a publicaciones" />
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Nueva publicación</h1>
        <p className="text-slate-600">Comparte algo con la comunidad y etiqueta a un Pokémon.</p>
      </header>
      <Card>
        <PostForm
          submitLabel="Publicar"
          isSubmitting={isLoading}
          onSubmit={async (data) => {
            const result = await createPost(data)
            if ('data' in result && result.data) {
              toast.success('Publicación creada')
              navigate(`/posts/${result.data.id}`)
            }
          }}
          onCancel={() => navigate('/posts')}
        />
      </Card>
    </section>
  )
}

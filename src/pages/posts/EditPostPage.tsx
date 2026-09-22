import { useNavigate, useParams } from 'react-router'
import { useNotify } from '@/features/notifications/hooks/useNotify'
import { useUpdatePostMutation } from '@/features/posts/api/postsApi'
import { PostForm } from '@/features/posts/components/PostForm'
import { usePost } from '@/features/posts/hooks/usePosts'
import { BackLink } from '@/shared/components/ui/BackLink'
import { Card } from '@/shared/components/ui/Card'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { PostNotFound } from './PostNotFound'

export function EditPostPage() {
  const id = Number(useParams().id)
  const { post, isLoading, isNotFound, isError } = usePost(id)
  const [updatePost, { isLoading: isSaving }] = useUpdatePostMutation()
  const navigate = useNavigate()
  const toast = useNotify()

  if (isLoading) return <Skeleton className="mx-auto h-96 max-w-2xl rounded-2xl" />
  if (isNotFound || isError || !post) return <PostNotFound error={isError} />

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <BackLink fallback={`/posts/${id}`} label="Volver a la publicación" />
      <h1 className="text-3xl font-extrabold tracking-tight">Editar publicación</h1>
      <Card>
        <PostForm
          defaultValues={{
            userId: String(post.userId),
            title: post.title,
            body: post.body,
            pokemon: post.pokemon ?? '',
          }}
          submitLabel="Guardar cambios"
          isSubmitting={isSaving}
          onSubmit={async (data) => {
            const result = await updatePost({ ...data, id })
            if ('data' in result) {
              toast.success('Publicación actualizada')
              navigate(`/posts/${id}`)
            }
          }}
          onCancel={() => navigate(`/posts/${id}`)}
        />
      </Card>
    </section>
  )
}

import { useCreatePostMutation } from '@/features/posts/api/postsApi'
import { PostForm } from '@/features/posts/components/PostForm'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'

export function NewPostPage() {
  const [createPost, { data: created, isLoading, isError, reset }] = useCreatePostMutation()

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Nueva publicación</h1>
        <p className="text-slate-600">
          Crea un post en JSONPlaceholder. La API responde como si lo guardara, pero no persiste los
          datos.
        </p>
      </header>

      {created ? (
        <Card className="animate-fade-in space-y-4">
          <p role="status" className="font-semibold text-emerald-700">
            ✓ Publicación creada con el id #{created.id}
          </p>
          <div>
            <h2 className="text-xl font-bold">{created.title}</h2>
            <p className="mt-2 whitespace-pre-line text-slate-700">{created.body}</p>
          </div>
          <Button variant="secondary" onClick={reset}>
            Crear otra publicación
          </Button>
        </Card>
      ) : (
        <Card>
          {isError && (
            <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              No se pudo crear la publicación. Inténtalo de nuevo.
            </p>
          )}
          <PostForm
            submitLabel="Publicar"
            isSubmitting={isLoading}
            onSubmit={(data) => createPost(data)}
          />
        </Card>
      )}
    </section>
  )
}

import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

/** Error boundary de rutas: captura errores de render o de carga de cualquier pantalla. */
export function RouteErrorPage() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} · ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Error desconocido'

  return (
    <main className="grid min-h-dvh place-items-center bg-slate-50 px-4">
      <div role="alert" className="max-w-md space-y-4 text-center">
        <p className="text-5xl">⚠️</p>
        <h1 className="text-2xl font-bold">Algo salió mal</h1>
        <p className="text-slate-600">Ocurrió un error inesperado al mostrar esta pantalla.</p>
        <p className="rounded-lg bg-slate-100 px-3 py-2 font-mono text-xs text-slate-500">
          {message}
        </p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium hover:bg-slate-50"
          >
            Recargar
          </button>
          <Link
            to="/"
            className="bg-brand-600 hover:bg-brand-700 inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}

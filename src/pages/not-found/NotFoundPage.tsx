import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-brand-600 text-6xl font-black">404</p>
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <p className="text-slate-600">La ruta que buscas no existe en esta dimensión.</p>
      <Link
        to="/"
        className="bg-brand-600 hover:bg-brand-700 rounded-md px-4 py-2 text-sm font-medium text-white"
      >
        Volver al inicio
      </Link>
    </section>
  )
}

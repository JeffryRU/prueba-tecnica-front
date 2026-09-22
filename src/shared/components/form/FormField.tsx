import { useId, type ReactNode } from 'react'

type FormFieldProps = {
  label: string
  error?: string
  hint?: string
  children: (props: {
    id: string
    'aria-invalid': boolean
    'aria-describedby'?: string
  }) => ReactNode
}

/** Etiqueta + control + mensaje de error/ayuda, con los atributos de accesibilidad enlazados. */
export function FormField({ label, error, hint, children }: FormFieldProps) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error ?? hint

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': message ? messageId : undefined,
      })}
      {message && (
        <p id={messageId} className={error ? 'text-sm text-red-600' : 'text-sm text-slate-500'}>
          {message}
        </p>
      )}
    </div>
  )
}

/** Estilos comunes de input, textarea y select. */
export const controlClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 aria-invalid:border-red-400 aria-invalid:focus:ring-red-100 disabled:bg-slate-50'

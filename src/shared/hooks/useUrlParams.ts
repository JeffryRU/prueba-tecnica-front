import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

type ParamValue = string | number

/**
 * Estado guardado en la URL (?clave=valor). `parse` convierte y valida los parámetros.
 * Al cambiar cualquier filtro se vuelve a la página 1; los valores vacíos se eliminan.
 */
export function useUrlParams<T extends Record<string, ParamValue>>(
  parse: (params: URLSearchParams) => T,
) {
  const [searchParams, setSearchParams] = useSearchParams()
  const values = useMemo(() => parse(searchParams), [parse, searchParams])

  const update = useCallback(
    (changes: Partial<T>) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current)
          const entries = Object.entries({ page: 1, ...changes })
          for (const [key, value] of entries) {
            const empty = value === '' || value === undefined || (key === 'page' && value === 1)
            if (empty) next.delete(key)
            else next.set(key, String(value))
          }
          return next
        },
        // Escribir en un filtro no debe llenar el historial; cambiar de página sí.
        { replace: changes.page === undefined },
      )
    },
    [setSearchParams],
  )

  return [values, update] as const
}

/** Lee `page` como entero positivo (1 por defecto). */
export function parsePage(params: URLSearchParams): number {
  const page = Number(params.get('page'))
  return Number.isInteger(page) && page > 0 ? page : 1
}

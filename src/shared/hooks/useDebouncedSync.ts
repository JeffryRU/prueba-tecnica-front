import { useEffect, useRef, useState } from 'react'
import { useDebounce } from './useDebounce'

/**
 * Campo de texto sincronizado con un valor externo (p. ej. un parámetro de la URL):
 * - lo que se escribe se confirma con `onCommit` tras `delay` ms sin cambios;
 * - si el valor externo cambia por otra vía (atrás/adelante, "limpiar"), el campo se actualiza.
 */
export function useDebouncedSync(
  externalValue: string,
  onCommit: (value: string) => void,
  delay = 300,
) {
  const [value, setValue] = useState(externalValue)
  const debounced = useDebounce(value, delay)
  const committed = useRef(externalValue)
  const commit = useRef(onCommit)

  useEffect(() => {
    commit.current = onCommit
  })

  useEffect(() => {
    if (externalValue !== committed.current) {
      committed.current = externalValue
      setValue(externalValue)
    }
  }, [externalValue])

  useEffect(() => {
    if (debounced !== committed.current) {
      committed.current = debounced
      commit.current(debounced)
    }
  }, [debounced])

  return [value, setValue] as const
}

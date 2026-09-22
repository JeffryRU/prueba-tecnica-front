/**
 * Acceso seguro a localStorage: puede no estar disponible (modo privado, cuota llena…),
 * así que los errores se ignoran y la app sigue funcionando sin persistencia.
 */
export function loadJson<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : undefined
  } catch {
    return undefined
  }
}

export function saveJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Sin persistencia: no es crítico.
  }
}

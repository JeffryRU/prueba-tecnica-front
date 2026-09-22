import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error
}

/** Traduce un error de RTK Query / red a un mensaje legible en español. */
export function getErrorMessage(error: unknown, fallback = 'Ocurrió un error inesperado'): string {
  if (!isFetchBaseQueryError(error)) {
    return error instanceof Error ? error.message : fallback
  }
  if (error.status === 'FETCH_ERROR') return 'No hay conexión con el servidor'
  if (error.status === 'TIMEOUT_ERROR') return 'El servidor tardó demasiado en responder'
  if (error.status === 'PARSING_ERROR') return 'La respuesta del servidor no es válida'
  if (error.status === 404) return 'El recurso solicitado no existe'
  if (typeof error.status === 'number' && error.status >= 500) {
    return 'El servidor tuvo un problema, inténtalo más tarde'
  }
  return fallback
}

export function isNotFound(error: unknown): boolean {
  return isFetchBaseQueryError(error) && error.status === 404
}

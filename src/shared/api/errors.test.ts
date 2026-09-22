import { describe, expect, it } from 'vitest'
import { getErrorMessage, isNotFound } from './errors'

describe('getErrorMessage', () => {
  it('traduce los errores de red y del servidor', () => {
    expect(getErrorMessage({ status: 'FETCH_ERROR', error: 'x' })).toBe(
      'No hay conexión con el servidor',
    )
    expect(getErrorMessage({ status: 503, data: null })).toMatch(/servidor tuvo un problema/)
    expect(getErrorMessage({ status: 404, data: null })).toBe('El recurso solicitado no existe')
  })

  it('usa el mensaje del Error o el texto por defecto', () => {
    expect(getErrorMessage(new Error('Fallo'))).toBe('Fallo')
    expect(getErrorMessage(null, 'Por defecto')).toBe('Por defecto')
  })

  it('detecta respuestas 404', () => {
    expect(isNotFound({ status: 404, data: null })).toBe(true)
    expect(isNotFound({ status: 500, data: null })).toBe(false)
  })
})

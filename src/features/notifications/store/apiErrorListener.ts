import { createListenerMiddleware, isRejectedWithValue } from '@reduxjs/toolkit'
import { getErrorMessage } from '@/shared/api/errors'
import { notify } from './notificationsSlice'

/**
 * Manejo global de errores: cualquier mutation rechazada de RTK Query muestra una notificación.
 * Las queries no se notifican aquí: cada pantalla muestra su propio estado de error.
 */
export const apiErrorListener = createListenerMiddleware()

apiErrorListener.startListening({
  matcher: isRejectedWithValue,
  effect: (action, { dispatch }) => {
    const meta = action.meta as { arg?: { type?: string } }
    if (meta.arg?.type !== 'mutation') return
    dispatch(notify('error', getErrorMessage(action.payload, 'No se pudo completar la operación')))
  },
})

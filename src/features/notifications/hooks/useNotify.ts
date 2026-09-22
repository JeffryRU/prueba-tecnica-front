import { useMemo } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { notify } from '../store/notificationsSlice'

/** Atajos para mostrar notificaciones: `const toast = useNotify(); toast.success('…')`. */
export function useNotify() {
  const dispatch = useAppDispatch()
  return useMemo(
    () => ({
      success: (message: string) => dispatch(notify('success', message)),
      error: (message: string) => dispatch(notify('error', message)),
      info: (message: string) => dispatch(notify('info', message)),
    }),
    [dispatch],
  )
}

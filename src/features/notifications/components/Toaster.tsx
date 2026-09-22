import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { cn } from '@/shared/utils/cn'
import {
  dismiss,
  selectNotifications,
  type Notification,
  type NotificationTone,
} from '../store/notificationsSlice'

const AUTO_DISMISS_MS = 4000

const tones: Record<NotificationTone, { icon: string; className: string }> = {
  success: { icon: '✓', className: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
  error: { icon: '!', className: 'border-red-200 bg-red-50 text-red-800' },
  info: { icon: 'i', className: 'border-sky-200 bg-sky-50 text-sky-800' },
}

export function Toaster() {
  const notifications = useAppSelector(selectNotifications)

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-4 sm:items-end"
    >
      {notifications.map((notification) => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  )
}

function Toast({ notification }: { notification: Notification }) {
  const dispatch = useAppDispatch()
  const { icon, className } = tones[notification.tone]

  useEffect(() => {
    const timer = setTimeout(() => dispatch(dismiss(notification.id)), AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [dispatch, notification.id])

  return (
    <div
      role={notification.tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'animate-toast-in pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg',
        className,
      )}
    >
      <span
        aria-hidden
        className="grid size-5 shrink-0 place-items-center rounded-full bg-current/10 text-xs font-bold"
      >
        {icon}
      </span>
      <p className="flex-1 font-medium">{notification.message}</p>
      <button
        type="button"
        onClick={() => dispatch(dismiss(notification.id))}
        className="opacity-60 transition hover:opacity-100"
        aria-label="Cerrar notificación"
      >
        ✕
      </button>
    </div>
  )
}

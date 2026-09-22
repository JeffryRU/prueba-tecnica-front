import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export type NotificationTone = 'success' | 'error' | 'info'

export type Notification = { id: string; tone: NotificationTone; message: string }

const MAX_VISIBLE = 4

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [] as Notification[],
  reducers: {
    notify: {
      reducer: (state, action: PayloadAction<Notification>) => {
        state.push(action.payload)
        if (state.length > MAX_VISIBLE) state.shift()
      },
      prepare: (tone: NotificationTone, message: string) => ({
        payload: { id: nanoid(), tone, message },
      }),
    },
    dismiss: (state, action: PayloadAction<string>) =>
      state.filter((notification) => notification.id !== action.payload),
  },
  selectors: {
    selectNotifications: (state) => state,
  },
})

export const { notify, dismiss } = notificationsSlice.actions
export const { selectNotifications } = notificationsSlice.selectors
export default notificationsSlice

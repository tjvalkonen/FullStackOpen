import { createSlice } from '@reduxjs/toolkit'
const initialState = "Notification!"

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification(state, action) {
      console.log("Notification reducer: " + action.payload)
      return action.payload
    }
  }
})

export const { notification } = notificationSlice.actions
export default notificationSlice.reducer
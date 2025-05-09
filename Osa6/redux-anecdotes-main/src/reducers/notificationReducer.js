import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

/*
const initialState =  {
    text: 'Notification!',
    hide: true
  }
    */

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification(state, action) {
      console.log("Nreducer Show: " + action.payload)
      return action.payload
    },
     
    hide(state, action) {
      console.log("Nreducer hide: " + action.payload)
      return ''
    }
  }
  
})

export const { notification, hide } = notificationSlice.actions
export default notificationSlice.reducer
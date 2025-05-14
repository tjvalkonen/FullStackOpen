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
    setNotification(state, action) {
      console.log("Nr Show: " + action.payload)
      return action.payload
    },
     
    clearNotification(state, action) {
      console.log("Nr hide: " + action.payload)
      return action.payload
    }
  },

  setNotification2(state, action)  {
    console.log("Nr hide: " + action.payload)
    return action.payload
  }
  
})

export const { setNotification, clearNotification , setNotification2} = notificationSlice.actions
export default notificationSlice.reducer
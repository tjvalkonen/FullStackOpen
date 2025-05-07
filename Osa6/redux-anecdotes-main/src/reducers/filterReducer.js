import { createSlice } from '@reduxjs/toolkit'
const initialState = []

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      // console.log(action.payload)
      return action.payload
    }
  }
})

/*
const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        console.log("filterReducer action.payload: " + (action.payload))
        return action.payload
      default:
        return state
    }
  }

  export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }
  */
 
  export const { filterChange } = filterSlice.actions
  export default filterSlice.reducer

  // export default filterReducer
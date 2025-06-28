import { createSlice } from '@reduxjs/toolkit'
import andecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    /*
    createAnecdote(state, action) {
      state.push(action.payload)
      /--- Old
      const anecdote = action.payload
      state.push({
        content: anecdote,
        id: getId(),
        votes: 0
      })
        ----/
    },
    */
   
    addVoteToId(state, action) {
      console.log("reducer addVoteToId: " +action.payload.votes)
  
      let map1 = state.map(anecdote =>
        anecdote.id !== action.payload.id ? anecdote : action.payload 
      )

      // sorting the anecdotes 
      const newMap = Array.from(map1).sort((a, b) => b.votes - a.votes)
      return newMap
    },
    
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVoteToId, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await andecdoteService.getAll()
    const newMap = Array.from(anecdotes).sort((a, b) => b.votes - a.votes)
    dispatch(setAnecdotes(newMap))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await andecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVoteTo = anecdote => {
  return async dispatch => {
  let votes = anecdote.votes
  const object = {
    id: anecdote.id,
    content: anecdote.content,
    votes: votes
  }

    const voteAnecdote = await andecdoteService.addVoteTo(object)

    
    dispatch(addVoteToId(voteAnecdote))
    console.log("reducer add vote to: " + votes)
  }
}

export default anecdoteSlice.reducer
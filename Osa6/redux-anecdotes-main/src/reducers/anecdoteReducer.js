import { createSlice } from '@reduxjs/toolkit'
import andecdoteService from '../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
  */

// const getId = () => (100000 * Math.random()).toFixed(0)

/*
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/
// const initialState = anecdotesAtStart.map(asObject)

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
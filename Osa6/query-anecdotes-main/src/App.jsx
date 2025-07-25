import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'


// import { useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import { useContext } from 'react'
import NotificationContext from './NotificationCOntext'

const App = () => {

const queryClient = useQueryClient()
const result = useQuery(
  {
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  }
)

const [message, dispatch] = useContext(NotificationContext)

// console.log("1 message: " + message)

const updateAnecdoteMutation = useMutation({
      mutationFn: updateAnecdote,
      onSuccess: (newAnecdote) => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        //const anecdotes = queryClient.getQueryData('anecdotes')
        //queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      },
})

if ( result.isLoading ) {
  return <div>loading data...</div> 
}

if (result.isError) {
  
  return <div>{result.error.message}!</div> 
}

const anecdotes = result.data

const handleVote = (anecdote) => {
  updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  // console.log('vote' + anecdote.votes + 1)
  dispatch({ type: "VOTE" , payload: { message: "anecdote  '" + anecdote.content + "' voted"}})
  setTimeout(() => { dispatch({ type: "HIDE" , payload: { message: null}})},  5000)
}

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

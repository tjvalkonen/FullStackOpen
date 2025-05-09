import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { notification, hide } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  
  // const anecdotes = useSelector(state => state.anecdotes)

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === "" ) {
      // console.log("filter empty" + filter)
      return anecdotes
    } else {
      // console.log("filter not empty: " + filter)
      var filteredAnecdotes = anecdotes.filter(anecdotes => anecdotes.content.includes(filter))
  
      return filteredAnecdotes
    }

  })

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(addVoteTo(id))
    dispatch(notification("You voted '" + content + "'"))
    setTimeout(() => { dispatch(hide("Tyhjäksi! ")) }, 5000)
  }

    return (
        <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div> 
      )}
      </div>  
    )
}

export default Anecdotes
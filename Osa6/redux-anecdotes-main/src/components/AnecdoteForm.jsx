import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notification, hide } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote= async (event) => {
        event.preventDefault()
        // console.log('new Anecdote')
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        // console.log(newAnecdote)
        dispatch(createAnecdote(newAnecdote))

        dispatch(notification("You created a new anecdote: " + content))
        setTimeout(() => { dispatch(hide("Tyhjäksi! ")) }, 5000)
        
    }
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
        </form>
        </div>
  )
}

export default NewAnecdote
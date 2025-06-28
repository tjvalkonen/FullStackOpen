import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { createStore } from 'redux'

const blogReducer = (state = [], action) => {
  if (action.type === 'NEW_BLOG') {
    state.push(action.payload)
    return state
  }

  return state
}

const store = createStore(blogReducer)

store.dispatch({
  type: 'NEW_BLOG',
  payload: {
    title: 'Blogi 1',
    author: 'Ykkönen',
    id: 1
  }
})

store.dispatch({
  type: 'NEW_BLOG',
  payload: {
    title: 'Blogi 2',
    author: 'kakkonen',
    id: 3
  }
})

const App = () => {

  return (
    <div>
      <h2>blogs</h2>
      {store.getState().map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
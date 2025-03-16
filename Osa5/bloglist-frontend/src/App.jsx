import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
//  const [newTitle, setNewTitle] = useState('')
//  const [newAuthor, setNewAuthor] = useState('')
//  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
//  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const onClickLogout = () => {
    window.localStorage.clear()
    window.location.reload(false)
  }
/*
  const blogForm = () => (
    <form onSubmit={addBlog}>
      title:<input
        value={newTitle}
        onChange={handleTitleChange}
      />
      <br></br>
      author:<input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      <br></br>
      url:<input
        value={newUrl}
        onChange={handleUrlChange}
      />
      <br></br>
      <button type="submit">create</button>
    </form>  
  )
    */
/*
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
  
    try {
      await blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setErrorMessage('a new blog ' + returnedBlog.title + ' by '+ returnedBlog.author +' added')
        setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
      }
    )
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  */
/*
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
*/
  const addBlog = (blogObject) => {
    // blogFormRef.current.toggle
    blogFormRef.current.toggleVisibility()
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }


// Refactored all under one return
/*
  if (user === null) {
    return (
      <div>
        
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }
*/
  return (
    <div>
      {!user &&
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}

      </div>
      
      }
      {user && 
      <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <div>
        <p>{user.name} logged in <button onClick={onClickLogout}>logout</button></p>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      </div>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
      }

    </div>
    /*
    <div>
      
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <div>
        <p>{user.name} logged in <button onClick={onClickLogout}>logout</button></p>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      </div>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    */
  )
}

export default App
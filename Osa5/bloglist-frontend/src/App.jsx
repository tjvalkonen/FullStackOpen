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
  const [errorMessage, setErrorMessage] = useState(null)
//  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log("Get all blogs")
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
// refactor to component
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

  const addBlog = async (blogObject) => {

    blogFormRef.current.toggleVisibility()

    try {
      await blogService
      .create(blogObject)
  
      .then(returnedBlog => {
  
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage('a new blog ' + returnedBlog.title + ' by '+ returnedBlog.author +' added')
        setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
      })
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateLikeOf = id => {
    const blog = blogs.find(b => b.id === id)
    let newLikes = blog.likes + 1
    

    console.log("---> New likes: " + newLikes)
    const changedBlog = { ...blog, likes: newLikes }
  
    blogService
      .update(id, changedBlog)
        .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        setErrorMessage(
          `Blog '${blog.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  
// Refactored all under one return
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

      <Togglable buttonLabel='create new blog' buttonLabelCancel='cancel' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      </div>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} username={blog.user.name} updateLike={() => updateLikeOf(blog.id)}/>
      )}
      </div>
      }

    </div>
  )
}

export default App
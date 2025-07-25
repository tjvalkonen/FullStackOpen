import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { createStore } from 'redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import userService from './services/users'
import User from './components/User'
import Users from './services/users'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { getOverlayDirection } from 'react-bootstrap/esm/helpers'

const notificationReducer = (state = '', action) => {
  if (action.type === 'NOTIFICATION') {
    // state.push(action.payload)
    return action.payload
  }

  return state
}

const store = createStore(notificationReducer)

const App = () => {
  // testing users

  const [users, setUsers] = useState([])
  useEffect(() => {
    console.log('Get all users')
    userService.getAll().then((users) => setUsers(users))
  }, [])

  // console.log(users)

  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
  // const [errorMessage, setErrorMessage] = useState(null)
  // const [notificationMessage, setNotificationMessage] = useState(null)
  const setErrorMessage = (message) => {
    console.log('dispatch' + message)
    store.dispatch({
      type: 'NOTIFICATION',
      payload: {
        message: message,
      },
    })
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('Get all blogs')
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // sorting blogs by likes
  blogs.sort((first, second) => second.likes - first.likes)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
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
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

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
    <div style={{ width: '400px' }}>
      <form onSubmit={handleLogin}>
        <div>
          username
          <Form.Control
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <Form.Control
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <Button type="submit" id="submit-button" variant="outline-success">
          login
        </Button>
      </form>
    </div>
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

        .then((returnedBlog) => {
          setBlogs(blogs.concat(returnedBlog))
          setErrorMessage(
            'a new blog ' +
              returnedBlog.title +
              ' by ' +
              returnedBlog.author +
              ' added'
          )
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

  const updateLikeOf = (id) => {
    const blog = blogs.find((b) => b.id === id)
    let newLikes = blog.likes + 1
    //console.log('Update like BLOG title: ' + blog.title)
    //console.log('---> New likes: ' + newLikes)
    const changedBlog = { ...blog, likes: newLikes }

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        // console.log('Returned BLOG: ' + returnedBlog)
        // setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        // console.log('Setting blogs')
        blogService.getAll().then((blogs) => setBlogs(blogs))
      })
      .catch((error) => {
        setErrorMessage(`Blog '${blog.name}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removeBlogOfId = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const message = `Remove blog ${blog.title} by ${blog.author}`
    const confirm = window.confirm(message)

    if (confirm) {
      blogService
        .remove(id, blog)
        .then((response) => {
          blogService.getAll().then((blogs) => setBlogs(blogs))
        })
        .catch((error) => {
          setErrorMessage(`Blog '${blog.name}' was already removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const isCurrentUserOf = (id) => {
    const blog = blogs.find((b) => b.id === id)

    // console.log("blog user id: " + blog.user.username)
    // console.log("logged user: " +  JSON.stringify(user.username))

    if (blog.user.username === user.username) {
      return true
    } else {
      return false
    }
  }
  // const errorMessage = store.getState().payload
  //console.log('message' + store.getState().payload)

  const UsersView = () => (
    <div>
      <h2>blog app</h2>
      <Notification message={''} />
      <h2>Users</h2>
      <div style={{ width: '400px' }}>
        <Table size="sm" bgcolor="white">
          <thead>
            <tr>
              <td width={'180'}> </td>
              <td>
                <b>blogs created</b>
              </td>
            </tr>
          </thead>
        </Table>

        {users.map((user) => (
          <User key={user.id} fullname={user.name} blogs={user.blogs} />
        ))}
      </div>
    </div>
  )

  const BlogsView = () => (
    <div>
      <h2>blog app</h2>
      <Notification message={''} />
      <div>
        <Togglable
          buttonLabel="create new blog"
          buttonLabelCancel="cancel"
          ref={blogFormRef}
        >
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>

      <br></br>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          username={blog.user.name}
          updateLike={() => updateLikeOf(blog.id)}
          removeBlog={() => removeBlogOfId(blog.id)}
          isCurrentUser={isCurrentUserOf(blog.id)}
        />
      ))}
    </div>
  )

  const padding = {
    padding: 5,
  }

  return (
    <div className="container">
      {!user && (
        <div>
          <h2>Log in to application</h2>
          <Notification message={''} />
          {loginForm()}
        </div>
      )}

      {user && (
        <Router>
          <Table bgcolor="lightgray">
            <thead>
              <tr>
                <td width={'180'}>
                  <Link style={padding} to="/">
                    <b>blogs</b>
                  </Link>
                  <Link style={padding} to="/users">
                    <b>users</b>
                  </Link>
                </td>
                <td>
                  {user.name} logged in{' '}
                  <Button variant="outline-danger" onClick={onClickLogout}>
                    logout
                  </Button>
                </td>
              </tr>
            </thead>
          </Table>

          <Routes>
            <Route path="/users" element={<UsersView />} />
            <Route path="/" element={<BlogsView />} />
          </Routes>
        </Router>
      )}
    </div>
  )
}

export default App

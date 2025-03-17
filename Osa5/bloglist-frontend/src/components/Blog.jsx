import { useState } from 'react'

const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div className="blog">
      <div style={hideWhenVisible}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
      <br></br>
        {blog.url}
        <br></br>
        likes {blog.likes}
        <br></br>
      {username}
    </div>
  </div>
  </div>
  )
  /*
  return (
    <div className="blog">
    {blog.title} {blog.author} <button onClick={toggleVisibility}>{label}</button>

    <Togglable buttonLabel='view' buttonLabelCancel='hide' >
    {blog.url}
    <br></br>
     likes {blog.likes}
     <br></br>

      {username}
    </Togglable>
  </div> 
  )
 */
}



export default Blog
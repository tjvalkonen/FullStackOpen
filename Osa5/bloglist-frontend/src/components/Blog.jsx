import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, username, updateLike }) => {
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
        likes {blog.likes} <button onClick={updateLike}>Like</button>
        <br></br>
      {username}
    </div>
  </div>
  </div>
  )

}



export default Blog
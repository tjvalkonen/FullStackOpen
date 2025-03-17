import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, username, updateLike }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  /*
  
  const updateLike = async (event) => {
    // event.preventDefault()
    console.log("addLike pressed")
    console.log("---> Old likes: " + blog.likes)
    console.log(blog.author)
    console.log(blog.title)
    console.log(blog.url)

    let newLikes = 0
    newLikes = newLikes + 1

    console.log("---> New likes: " + newLikes)

      event.preventDefault()
      try {
        await blogService
        // .update()
        console.log("Ok ")
      } catch (exception) {
        console.log("ei ok ")
      }
  }  
      */



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
import { useState } from 'react'


const Blog = ({ blog, username, updateLike, removeBlog, isCurrentUser }) => {
  const [visible, setVisible] = useState(false)
  // const [isUser, setIsUser] = useState(isCurrentUser)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // console.log("is current user" + isCurrentUser)

  const showWhenCurrentUser = { display: isCurrentUser ? '' : 'none' }

  // const confirmButton = document.querySelector("#confirmButton")


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
        likes {blog.likes} <button id="likeButton" onClick={updateLike}>Like</button>
          <br></br>
          {username}
          <br></br>
          <div style={showWhenCurrentUser}>
            <button id="confirmButton" onClick={removeBlog}>remove</button>
          </div>
        </div>
      </div>
    </div>
  )

}



export default Blog
import { useState } from 'react'

const Blog = ({ blog , username, updateLike, removeBlog, isCurrentUser }) => {
  const [visible, setVisible] = useState(false)
  const [isUser, setIsUser] = useState(isCurrentUser)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // console.log("is current user" + isCurrentUser)

  const showWhenCurrentUser = { display: isCurrentUser ? '' : 'none' }

  return (
    <div>
      <div className="blog" data-testid='test-blog'>
        <div style={hideWhenVisible} id="lessInfoDiv">

          {blog.title} {blog.author} <button id="ShowMore" onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible} id="moreInfoDiv">
          {blog.title} {blog.author} <button id="ShowLess" onClick={toggleVisibility}>hide</button>
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
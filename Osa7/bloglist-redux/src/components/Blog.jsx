import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const Blog = ({ blog, username, updateLike, removeBlog, isCurrentUser }) => {
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
    <div className="container">
      <div className="blog" data-testid="test-blog">
        <div style={hideWhenVisible} id="lessInfoDiv">
          <Table size="sm" bgcolor="white">
            <thead>
              <tr>
                <td>
                  <h4>{blog.title}</h4> {blog.author}{' '}
                </td>
                <td>
                  {' '}
                  <Button
                    id="ShowMore"
                    variant="outline-secondary"
                    size="sm"
                    onClick={toggleVisibility}
                  >
                    view
                  </Button>
                </td>
              </tr>
            </thead>
          </Table>
        </div>
        <div style={showWhenVisible} id="moreInfoDiv">
          <Table size="sm" bgcolor="white">
            <thead>
              <tr>
                <td>
                  <h4>{blog.title}</h4> {blog.author}{' '}
                </td>
                <td>
                  {' '}
                  <Button
                    id="ShowLess"
                    variant="outline-secondary"
                    size="sm"
                    onClick={toggleVisibility}
                  >
                    hide
                  </Button>
                </td>
              </tr>
            </thead>
          </Table>
          {blog.url}
          <br></br>
          likes {blog.likes}{' '}
          <Button variant="outline-success" size="sm" onClick={updateLike}>
            Like
          </Button>
          <br></br>
          {username}
          <br></br>
          <div style={showWhenCurrentUser}>
            <Button variant="outline-danger" size="sm" onClick={removeBlog}>
              remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog

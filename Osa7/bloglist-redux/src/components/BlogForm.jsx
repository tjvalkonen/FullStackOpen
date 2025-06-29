import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="container">
      <div style={{ width: '400px' }} className="createNewForm">
        <h3>Create New Blog</h3>
        <form onSubmit={addBlog}>
          <Table size="sm">
            <thead>
              <tr>
                <th>title:</th>
                <th>
                  <Form.Control
                    id="title-input"
                    data-testid="title-input"
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}
                  />
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>author:</th>
                <th>
                  <Form.Control
                    id="author-input"
                    data-testid="author-input"
                    value={newAuthor}
                    onChange={(event) => setNewAuthor(event.target.value)}
                  />
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>url:</th>
                <th>
                  <Form.Control
                    id="url-input"
                    data-testid="url-input"
                    value={newUrl}
                    onChange={(event) => setNewUrl(event.target.value)}
                  />
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <td colSpan={2}>
                  <Button
                    id="submit-button"
                    type="submit"
                    variant="outline-success"
                  >
                    create
                  </Button>
                </td>
              </tr>
            </thead>
          </Table>
        </form>
      </div>
    </div>
  )
}

export default BlogForm

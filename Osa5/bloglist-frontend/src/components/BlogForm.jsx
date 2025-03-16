import { useState } from 'react'

const BlogForm = ({createBlog}) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }
    

return (
    <div>
        <h2>create new</h2>
    <form onSubmit={addBlog}>
      title:<input
        value={newTitle}
        onChange={event => setNewTitle(event.target.value)}
        // onChange={handleTitleChange}
      />
      <br></br>
      author:<input
        value={newAuthor}
        onChange={event => setNewAuthor(event.target.value)}
        // onChange={handleAuthorChange}
      />
      <br></br>
      url:<input
        value={newUrl}
        onChange={event => setNewUrl(event.target.value)}
        // onChange={handleUrlChange}
      />
      <br></br>
      <button type="submit">create</button>
    </form>
    </div>
)
}

export default BlogForm
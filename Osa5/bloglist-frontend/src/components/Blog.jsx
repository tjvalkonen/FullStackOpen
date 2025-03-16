import Togglable from './Togglable'

const Blog = ({ blog, username }) => (

  
  <div className="blog">
    {blog.title} {blog.author}

    <Togglable buttonLabel='view' buttonLabelCancel='hide' >
    {blog.url}
    <br></br>
     likes {blog.likes}
     <br></br>
      {username}
    </Togglable>
  </div>  
)



export default Blog
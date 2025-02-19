const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // if no user defined, set the first one
  // const users = await User.find({})
  // user = users[0]

  if(request.user === undefined || request.user === null ){
    response.status(401).json({ error: 'Unauthorized' }).end()
  } else if(body.title === undefined || body.title === null){
    response.status(400).end()
  } else if(body.url === undefined || body.url === null){
    response.status(400).end()
  } else {
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {

  if (request.user === undefined || request.user === null ){
    response.status(401).json({ error: 'Unauthorized' }).end()
  } else if (request.params.id === undefined || request.params.id === null ) {
    response.status(400).json({ error: 'blog id missing' }).end()
  }

  const blog = await Blog.findById(request.params.id)

  if(blog === undefined || blog === null){
    // console.log(`Blog not found`)
    response.status(400).json({ error: 'blog not found' }).end()
  }
  let user = request.user

  // console.log(`user_id!!: ${user._id}`)
  // console.log(`blog_id: ${blog._id}`)
  // console.log(`blog_user: ${blog.user}`)
  // console.log(`blog.id: ${request.params.id}`)
  // console.log(`user.id: ${user.id.toString()}`)

  if(blog.user.toString() === user.id.toString()){
    // console.log("DELETE?")
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    // unauthorized
    response.status(401).json({ error: 'delete unauthorized' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  // check user?
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
const Blog = require('../models/blog')
const User = require('../models/user')

const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(element => {
    likes = likes + element.likes
  })
  return likes
}


const favouriteBlog = (blogs) => {
  let blogX = {
    title: '',
    author: '',
    likes: 0
  }

  if(blogs.length === 0){
    return ''
  } else {
    blogs.forEach(blog => {
      if(blog.likes >= blogX.likes){
        blogX.title = blog.title
        blogX.author = blog.author
        blogX.likes = blog.likes
      }
    })

    return blogX
  }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  blogsInDb,
  usersInDb,
}
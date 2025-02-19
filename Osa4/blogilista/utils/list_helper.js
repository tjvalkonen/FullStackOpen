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

const mostBlogs = (blogs) => {
  // Authors + blogs
  let mostBlogsAuthor = {
    author: '',
    blogs: 0
  }

  const mapAuthors = new Map()

  if(blogs.length === 0){
    return mostBlogsAuthor
  } else {
    for (let i = 0; i < blogs.length; i++){
      let includes = mapAuthors.has(blogs[i].author)
      if (includes) {
        let b = mapAuthors.get(blogs[i].author) + 1
        mapAuthors.set(blogs[i].author, b)
      } else {
        mapAuthors.set(blogs[i].author, 1)
      }
    }
  }

  mapAuthors.forEach(findMostBlogsAuthor)

  function findMostBlogsAuthor(value, key, map) {
    // console.log(`map.get('${key}') = ${value}`);
    if(mostBlogsAuthor.blogs < value){
      mostBlogsAuthor.author = key
      mostBlogsAuthor.blogs = value
    }
  }
  // console.log(mostBlogsAuthor)
  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  // Authors + blogs
  let mostLikesAuthor = {
    author: '',
    likes: 0
  }

  const mapAuthors = new Map()

  if(blogs.length === 0){
    return mostLikesAuthor
  } else {
    for (let i = 0; i < blogs.length; i++){
      let includes = mapAuthors.has(blogs[i].author)
      if (includes) {
        let l = mapAuthors.get(blogs[i].author) + blogs[i].likes
        mapAuthors.set(blogs[i].author, l)
      } else {
        mapAuthors.set(blogs[i].author, blogs[i].likes)
      }
    }
  }

  // console.log(mapAuthors)
  mapAuthors.forEach(findMostLikesAuthor)
  function findMostLikesAuthor(value, key, map) {
    // console.log(`map.get('${key}') = ${value}`);
    if(mostLikesAuthor.likes < value){
      mostLikesAuthor.author = key
      mostLikesAuthor.likes = value
    }
  }

  // console.log(mostLikesAuthor)
  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  blogsInDb,
  usersInDb,
  mostBlogs,
  mostLikes
}
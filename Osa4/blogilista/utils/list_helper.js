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
    title: "",
    author: "",
    likes: 0
  }

  if(blogs.length === 0){
    return ""
  } else {
    blogs.forEach(blog => {
      if(blog.likes >= blogX.likes){
        blogX.title = blog.title
        blogX.author = blog.author
        blogX.likes = blog.likes
      }
    })
    /*
  
    let blogXformatted = {
      title: `${blogX.title}`,
      author: `${blogX.author}`,
      likes: blogX.likes
    }
*/
    return blogX
  }
}

  module.exports = {
    dummy, 
    totalLikes,
    favouriteBlog
  }
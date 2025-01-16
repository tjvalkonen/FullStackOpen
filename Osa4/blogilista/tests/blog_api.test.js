const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

// refactor?? rename?
const listHelper = require('../utils/list_helper')

const bcrypt = require('bcrypt')
const User = require('../models/user')

// test user creation
describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'testaustyyppi',
      name: 'Tyyppi Testaaja',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    // assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    expect(usersAtEnd.length).toEqual(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    // assert(result.body.error.includes('expected `username` to be unique'))
    expect(result.body.error).toContain(
      'expected `username` to be unique'
    )
    // assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })


})

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
]

const oneExtraBlog = 
{
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
}

const secondExtraBlog = 
{
  title: 'Type wars Extra',
  author: 'Robert C. Martin Extra',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
}

const oneBlogTitleMissing = 
{
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
}

const oneBlogUrlMissing = 
{
  title: 'Type wars Extra',
  author: 'Robert C. Martin',
  likes: 2,
}

const oneBlogToUpdate = 
{
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 10,
}

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('the indentification field is named id', async () =>{
    const response = await api.get(`/api/blogs/${initialBlogs[0]._id}`)
    expect(response.body.id).toBeDefined();
  })
})

describe('adding one blog to database with HTTP POST', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)

    await api
    .post('/api/blogs')
    .send(oneExtraBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  })

  test('database lenght is increased by one', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length +1)
  })

  test('added extra blog is in the database', async () => {
    const blogsAtEnd = await listHelper.blogsInDb()

    const title = blogsAtEnd.map(b => b.title)
    expect(title).toContain(
      'Type wars'
    )
  })
})

describe('adding one blog without likes to database with HTTP POST', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    await api
    .post('/api/blogs')
    .send(secondExtraBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  })

  test('added blog likes is zero', async () => {
    const blogsAtEnd = await listHelper.blogsInDb()
    const likes = blogsAtEnd[0].likes
    expect(likes).toBe(0)
  })
})


describe('deletion of a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await listHelper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await listHelper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('title or url fields missing gives status code 400', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('title missing gives status code 400', async () => {
    await api
    .post('/api/blogs')
    .send(oneBlogTitleMissing)
    .expect(400)
  })

  test('url missing gives status code 400', async () => {
    await api
    .post('/api/blogs')
    .send(oneBlogUrlMissing)
    .expect(400)
  })
})

describe('updating a specific blog is possible', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  
  test('specific blog is updated', async () => {
    const blogsAtStart = await listHelper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(oneBlogToUpdate)
    .expect(200)
    const blogsAtEnd = await listHelper.blogsInDb()
    const likes = blogsAtEnd[0].likes
    expect(likes).toBe(10)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const book = require('./models/book')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(args.author){
        return Book.find({ author: args.author.name })
      }
      if(args.genre) {
        return Book.find({ genres: {$all:[args.genre]} })
      } else {
        return Book.find({})
      }   
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    allAuthors: async () => {
      return Author.find({})
    }
  },
  Author: {
    bookCount: async (root) => {
      let authorBooks = await Book.collection.countDocuments({})
      let count =  await Book.find({ author: root._id})
      // console.log(Object.keys(count).length)
      // console.log(root.name)
      // console.log(root._id)
      // console.log(authorBooks)
      return Object.keys(count).length
    }
  },
  Mutation : {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          }
        })
      }

      // find if the author exists..
      // console.log(args.author)
      let author = await Author.findOne({ name: args.author })

      if(!author){
        author = new Author({ name: args.author  })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: author.name,
              error
            }
          })
        }
      }

      const book = new Book({ title: args.title, 
        author: author, 
        published: args.published, 
        genres: args.genres 
      })
      
      try {
        await book.save()
        console.log("saved")

      } catch (error) {      
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error     
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    addAuthor: async (root, args, context) => {
      const author = new Author({ ...args })
      const currentUser = context.currentUser

      /*
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      */

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: author.name,
            error
          }
        })
      }

      return author

    },
    editAuthor: async (root, args, context ) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = await Author.findOne({name : args.name})
      author.born = args.setBornTo

      try {
        await author.save()
        
      } catch (error) {
        throw new GraphQLError('Saving born failed'), {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.born,
            error
          }
        }
      }
      return author
    },
  createUser: async (root, args) => {
    const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

    return user.save()
      .catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      })
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secret' ) {
      throw new GraphQLError('wrong credentials', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })        
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
  },
  },
  Subscription: {
    bookAdded: {
        subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    },
    },
}

module.exports = resolvers
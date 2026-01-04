import { useState, useQuery } from "react";
import { useApolloClient, useSubscription } from '@apollo/client/react'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommended from './components/Recommended'

import { BOOK_ADDED, ALL_BOOKS } from './queries.js'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors");
  
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const [favorite, setFavorite] = useState(null)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
       console.log(data)
      const addedBook = data.data.bookAdded
      window.alert(`New book: ${addedBook.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })


   /*
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
*/


    const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

    const logout = () => {
    setToken(null)
    setFavorite(null)
    localStorage.clear()
    client.resetStore()
  }

  
  if (!token) {
    return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>   
        <button onClick={() => setPage("login")}>login</button>
      </div>
      <Authors show={page === "authors"}/>
      <Books show={page === "books"} />
      <LoginForm show={page === "login"} setToken={setToken} setFavorite={setFavorite} setError={notify}/>
     </div>
    )
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>    
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommended")}>recommended</button>
        
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} token ={token}/>

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />

      <Recommended show={page ==="recommended"} favorite={favorite}/>

      
    </div>
  );
};

// books={result2.data.allBooks}

// authors={result1.data.allAuthors}

export default App;

// 
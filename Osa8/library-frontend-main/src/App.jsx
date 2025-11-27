import { useState } from "react";
import { useQuery, useApolloClient } from '@apollo/client/react'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Recommended from './components/Recommended'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors");
  
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  /*
  if(page === "authors"){
    result = useQuery(ALL_AUTHORS)
  } else if (page === "books"){
    result = useQuery(ALL_BOOKS)
  }
    */
   /*
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
*/
  const result1 = useQuery(ALL_AUTHORS)
  const result2 = useQuery(ALL_BOOKS)

  if (result1.loading || result2.loading)  {
    return <div>loading...</div>
  }

    const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

    const logout = () => {
    setToken(null)
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
      <Authors show={page === "authors"} authors={result1.data.allAuthors}  token ={token}/>

      <Books show={page === "books"} books={result2.data.allBooks}/>

      <LoginForm show={page === "login"} setToken={setToken} setError={notify}/>
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

      <Authors show={page === "authors"} authors={result1.data.allAuthors}  token ={token}/>

      <Books show={page === "books"} books={result2.data.allBooks}/>

      <NewBook show={page === "add"} />

      <Recommended show={page ==="recommended"} genre="Juusto"/>

      
    </div>
  );
};

export default App;

// 
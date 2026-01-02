import { useQuery } from '@apollo/client/react'
// import { gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = ({ show }) => {

  const userInfo = useQuery(ME);
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    if(userInfo.data){
      setGenre(userInfo.data.me.favoriteGenre)
    }
  },[setGenre , userInfo])

  // console.log("user favorite genre: ", userInfo)
  
  const result = useQuery(ALL_BOOKS, { variables: genre })
  
  useEffect(() => {
    result.refetch({ genre })
    }, [genre])

  
  if (!show) {
    return null
  }

  
  console.log("Recommended! ", genre)

  if (result.loading)  {
    return <div>loading...</div>
  }

    const books = result.loading
    ? result.previousData.allBooks
    : result.data.allBooks


  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b> {genre} </b></p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
              <td>{a.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended

/*
          {books.result.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
            */
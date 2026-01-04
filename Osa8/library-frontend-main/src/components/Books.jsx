import { ALL_BOOKS } from '../queries'
import { useState, useEffect, useRef } from "react";
import { useQuery } from '@apollo/client/react'

const Books = ({ show }) => {
    const [genre, setGenre] = useState(null)
    const result = useQuery(ALL_BOOKS, { 
      variables: genre,
      pollInterval: 12000
    })
    let genres = useRef([])

  


  useEffect(() => {
    result.refetch({ genre })
    }, [genre])

  useEffect(() => {
    if (!result.previousData && result.data) {
      genres.current = [...new Set(result.data.allBooks.map((b) => b.genres).flat())]
    }
  }, [result])

  if (!show) {
    return null
  }

  if (result.loading )  {
    return <div>loading...</div>
  }
    const books = result.loading
    ? result.previousData.allBooks
    : result.data.allBooks

  return (
    <div>
      <h2>books</h2>

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

        {genres.current.map((genre) => (
          <button key={genre} onClick={() => result.refetch({ genre })}>
            {genre}
          </button>
        ))}
        <button key="all" onClick={() => result.refetch({ genre: null })}>
          all
        </button>

    </div>
  )
}

export default Books

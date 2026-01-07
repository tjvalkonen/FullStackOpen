import { ALL_BOOKS } from '../queries'
import { useState, useEffect, useRef } from "react";
import { useQuery } from '@apollo/client/react'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, { 
      variables: genre,
      pollInterval: 12000  
    }
  )
  let genres = useRef([])

  useEffect(() => {
    result.refetch({ genre })
    }, [genre])

  useEffect(() => {
    if (result.data) {
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

const SelectedGenre = ({genre}) => {
  if ( !genre ) {
    return null
  }
  return (
    <div>
      in genre <b>{genre}</b>
    </div>
  )
}

const GenreButtons = ({genre}) => {
  if(!genre) {
    return <div>
        {genres.current.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
  } else {
    return <div>
      <button key="all" onClick={() => setGenre(null )}>
          all
        </button>
      </div>
  }
}

  return (
    <div>
      <h2>books</h2>      
      <SelectedGenre genre={genre} />
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <GenreButtons genre={genre} />
    </div>
  )
}

export default Books

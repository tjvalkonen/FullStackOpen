import { useQuery } from '@apollo/client/react'
// import { gql } from '@apollo/client'

import { ALL_BOOKS } from '../queries'



const Recommended = (props) => {

    const result = useQuery(ALL_BOOKS)
    // const books = props.books

  if (!props.show) {
    return null
  }

 
  

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b> {props.genre} </b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
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
import BirthYearForm from "./BirthYearForm";
import { useQuery } from '@apollo/client/react'
// import { useState } from 'react'
import { ALL_AUTHORS } from '../queries'

const Authors = ({show ,token}) => {

const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }
  
  if (result.loading )  {
    return <div>loading...</div>
  }

      const authors = result.loading
    ? result.previousData.allAuthors
    : result.data.allAuthors

  //const authors = props.authors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYearForm authors={authors} token={token}/>
    </div>
  )
}

export default Authors

import { useState } from 'react'
import { useMutation } from '@apollo/client/react'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthYearForm = ({ authors, token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBirthYear ] = useMutation(EDIT_AUTHOR , {
      refetchQueries: [ { query: ALL_AUTHORS } ],
      onError: (error) => {
        const messages = error.graphQLErrors.map(e => e.message).join('\n')
        console.log(messages)
      }
    })
  

  const submit = async (event) => {
    event.preventDefault()
    changeBirthYear({ variables: { name, born:parseInt(born, 10) } })
    setName('')
    setBorn('')
  }

  if (!token) {
    return null
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )

}

export default BirthYearForm
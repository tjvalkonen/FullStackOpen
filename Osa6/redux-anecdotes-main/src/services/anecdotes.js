import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
  return response.data
}

  const getSpecificAnecdote = (id) => {
    return baseUrl+`/${id}`;
  }

const addVoteTo = async (content) =>{
  const object = {
    id: content.id,
    content: content.content,
    votes: content.votes + 1
  }
  
  console.log("service add vote to: " + object.votes)

  const response = await axios.put(getSpecificAnecdote(object.id), object)
  return response.data
}

export default { getAll, createNew, addVoteTo }
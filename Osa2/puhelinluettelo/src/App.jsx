import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
/*
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  */
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('add button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const nameExist = persons.some(p => p.name === newName)

    if(nameExist){
      alert(`${newName} is already added to phonebook`)
    } else {
      console.log('Name exists ', nameExist)
    //  console.log('persons', persons[0].name)
      console.log('newName', newName)
      console.log('nameObject', nameObject)
      setPersons(persons.concat(nameObject))
  
      setNewName('')
      setNewNumber('')
    }

  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  
  const filterItems = (arr, query) => {
      console.log('filter ', arr)
      return arr.filter(element => 
      element.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }




  return (
    <div><h2>Phonebook</h2>
      <Filter  filterName={filterName} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filterItems={filterItems} persons={persons} filterName={filterName}/>     
    </div>
  )

}

export default App
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

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

  // Refactor to message?
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios
      personService
        .getAll()
        .then(response => {
          setPersons(response.data)
        })

  }, [])

  const updateNumber = (props) => {
    console.log('update number ', props)
    const person = persons.find(p => p.id === props.id)
    const changedPerson = { ...person, number: props.number }
  
    personService
      .update(props.id, changedPerson)
      .then(response => {
        console.log('Update response ', response)
      })
      .catch(error => {
        setErrorMessage(
          `${error.response.data.error}`
          )
          setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
        /*
        alert(
          `'${person.name}' was already deleted from server`
        )
        */
        //setPersons(persons.filter(p => p.id !== props.id))
    })
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
    setErrorMessage(
      `'${person.name}' number is updated`
      )
      setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    console.log('add button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const nameExist = persons.some(p => p.name === newName)
    const personX = persons.find((p) => p.name === newName)

    if(nameExist){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updateNumberObject = {
          id: personX.id,
          name: personX.name,
          number: newNumber,
        }    
          console.log('found person ', personX)
          updateNumber(updateNumberObject)      
      }
      // alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
    } else {
      console.log('Name exists ', nameExist)
    //  console.log('persons', persons[0].name)
      console.log('newName', newName)
      console.log('nameObject', nameObject)

      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          
          setErrorMessage(
            `'${nameObject.name}' added to the phonebook`
            )
            setTimeout(() => {
              setErrorMessage(null)
          }, 5000)
          

      })      
      .catch(error => {
        console.log('add name error ',error)
        setErrorMessage(
          `${error.response.data.error}`
          )
          setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
      })
      
      // testing error messages...
      /*
        setErrorMessage(
          `'${nameObject.name}' added to the phonebook`
          )
          setTimeout(() => {
            setErrorMessage(null)
        }, 5000)

        */
    }
  }

  const removePersonX = (id) => {
    const person = persons.find(p => p.id === id)

    if(window.confirm(`Delete '${person.name}'?`)){
      personService
        .remove(id)
        .then(response => {
        console.log('Remove response ', response)
      })
      .catch(error => {
        setErrorMessage(
          `'${person.name}' was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
        }, 5000) 
      })
      
      personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      setErrorMessage(
        `'${person.name}' is deleted`
        )
        setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
      
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
      <Notification message={errorMessage} />
      <Filter  filterName={filterName} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filterItems={filterItems} 
        persons={persons} 
        filterName={filterName}
        removePersonX={removePersonX}
      />     
    </div>
  )

}

export default App
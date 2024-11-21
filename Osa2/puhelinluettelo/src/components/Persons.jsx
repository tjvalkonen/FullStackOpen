const PersonsFiltered = (props) => {
  return (
    <div>
      {props.name} {props.number} <button onClick={props.removePerson}>delete</button>
    </div>
  )
}

const Persons = (props) => {
  return (
    props.filterItems(props.persons, props.filterName).map(persons => 


      <PersonsFiltered 
        key={persons.name} 
        name={persons.name}
        number={persons.number}
        removePerson={() => props.removePersonX(persons.id)}
        // removePerson={props.removePerson}
        />

    )
  )
}

//onClick={removePerson}

export default Persons
const PersonsFiltered = (props) => {
  return (
    <div>
      {props.name} {props.number}
    </div>
  )
}

const Persons = (props) => {
  return (
    props.filterItems(props.persons, props.filterName).map(persons => 
      <PersonsFiltered key={persons.name} name={persons.name} number={persons.number}/>
    )
  )
}

export default Persons
import { useState } from 'react'

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log('part props ', props)
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  console.log('Content parts ', props)
  return (
    <div>
    {props.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}




const Total = (props) => {
  console.log('Total props ',props)

  const total = props.parts.reduce( (s, p) => {
    console.log('using reduce', s ,p)
    return s + p.exercises
  },0)
  
  return (
    <div>
      <p><b>Number of exercises {total}</b></p>
    </div>
  )
}

const Course = (props) =>{
  console.log(props)
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'More',
        exercises: 4,
        id: 4
      }
    ]
  }
  //const [ totalsum, setTotalsum] = useState(0)
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
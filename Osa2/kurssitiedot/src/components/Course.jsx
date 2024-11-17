const Header = (props) => {
    console.log('Header props ', props)
    return (
      <div>
        <h2>{props.course}</h2>
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
        {props.parts.map(part => <Part key={part.id} part={part} /> )}
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

const Course = (course) =>{
    console.log('course module ', course)
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course
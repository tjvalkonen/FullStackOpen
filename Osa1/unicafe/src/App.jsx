import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => (
  <div>
    <h1>Statistic</h1>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
    <p>all {props.total}</p>
    <p>average {(props.good - props.bad)/props.total} </p>
    <p>positive {(props.good/props.total)*100}%</p>
  </div>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const addGood = () => {
    const updateGood = good + 1
    setGood(updateGood)
    console.log('good after', updateGood)
    const updateTotal = total + 1
    setTotal(updateTotal)
    console.log('total after', updateTotal)
  }

  const addNeutral = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    console.log('neutral after', updateNeutral)
    const updateTotal = total + 1
    setTotal(updateTotal)
    console.log('total after', updateTotal)
  }

  const addBad = () => {
    const updateBad = bad + 1
    setBad(updateBad)
    console.log('bad after', updateBad)
    const updateTotal = total + 1
    setTotal(updateTotal)
    console.log('total after', updateTotal)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={addGood} text='good' />
      <Button handleClick={addNeutral} text='neutral' />
      <Button handleClick={addBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App
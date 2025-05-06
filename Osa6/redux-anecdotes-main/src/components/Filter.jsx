import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      console.log("Filter change " + event.input)
      filterChange('ALL').payload = event.input
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter
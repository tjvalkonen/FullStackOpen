


const Filter =(props) =>{
    return (
<form>
    <div>
        filter shown with: <input 
        value={props.filterName}
        onChange={props.handleFilterChange}/>
    </div>
</form>
)
}

// console.log(filterItems(persons, filterName));

export default Filter
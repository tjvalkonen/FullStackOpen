import { useSelector } from 'react-redux'

const Notification = () => {
  // console.log("dispatched")
  // console.log("Notification component: ")
  // setTimeout(() => { console.log("timeout 1s")}, 1000)

 // const notification = useSelector(state => state.notification)

  const notification = useSelector(({ notification }) => {
      // console.log("notification  component ")
      return notification
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // If notification is empty = '', "hide" it"
  if(notification === ""){
    return ( null )
  } else { 
    return (
      <div style={style}>
      {notification}
      </div>
    )
  }

}

export default Notification



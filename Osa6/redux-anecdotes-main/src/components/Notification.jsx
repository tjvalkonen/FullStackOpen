import { useSelector } from 'react-redux'

const Notification = () => {
  // console.log("Notification component: ")
  // setTimeout(() => { console.log("timeout 1s")}, 1000)

 // const notification = useSelector(state => state.notification)

  const notification = useSelector(({ notification }) => {
      //
      return notification

  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // If notification is empty = '', "hide" it"
if(notification === ''){
  return (
    <div>
    </div>
  )
} else {
  return (
    <div style={style}>
    {notification}
    </div>
  )
}

  
}





export default Notification



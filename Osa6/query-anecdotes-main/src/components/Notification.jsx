import { useContext } from 'react'
import {useNotificationValue} from '../NotificationCOntext'

const Notification = () => {
  const notification = useNotificationValue()
  // console.log("Notification: " + notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  // if (isHidden) return null
  if(notification == null){
    return (
      <div></div>
    )
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification

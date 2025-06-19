import { useContext } from 'react'
import {useNotificationValue} from '../NotificationCOntext'

const Notification = () => {
  const notification = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  // if (isHidden) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification

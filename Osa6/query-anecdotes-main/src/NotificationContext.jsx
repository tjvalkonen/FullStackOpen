import { createContext, useReducer, useContext } from 'react'



const notificationReducer = (state, action) => {
  console.log("action.type: " + action.type)
  switch (action.type) {
    case "VOTE":
        return action.note
    case "HIDE":
        return ""
    default:
        return ""
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  console.log("useNotificationValue: ?")
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}




export default NotificationContext
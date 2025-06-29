import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  //console.log("action.type: " + action.type)
  //console.log("state: " + state)
  //console.log("action.payload: " + action.payload.message)
  switch (action.type) {
    case "VOTE":
        return action.payload.message
    case "CREATE":
        return action.payload.message
    case "ERROR":
        return action.payload.message
    case "HIDE":
        return null
    default:
        return null
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
  // console.log("useNotificationValue: ?" + NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  // console.log("DisuseNotificationValue: ?" + NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
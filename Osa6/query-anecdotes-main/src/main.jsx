import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationCOntext'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
/*
    
     <App />
  
*/

  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
     <App />
    </NotificationContextProvider>
  </QueryClientProvider>


)
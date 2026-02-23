// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/*
interface WelcomeProps {
  name: string;
}

eslint-disable-next-line react-refresh/only-export-components
/*
const Welcome = (props: WelcomeProps) => {  
  return <h1>Hello, {props.name}</h1>;
};
*/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App/>
)

/*
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/
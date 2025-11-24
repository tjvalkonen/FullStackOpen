import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ApolloClient, InMemoryCache, gql, HttpLink  } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'


const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'http://localhost:4000' }),
})

/*
client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

/*
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

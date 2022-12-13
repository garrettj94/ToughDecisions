import './App.css'; 
import Home from './components/home';
import Navigationbar from './components/navbar';
import React from 'react';
import Login from './components/login'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
const httpLink = createHttpLink({ uri: '/graphql'})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    },
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div>
        <Navigationbar />
        <Home />
        <Login />
    </div>
    </ApolloProvider>
  );
}

export default App;
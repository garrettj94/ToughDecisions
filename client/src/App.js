import './App.css';
import Home from './components/home';
import Navigationbar from './components/navbar';
import React from 'react';
import Login from './components/login'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import CreateQ from './components/createQ';
import answerQ from './components/answerQ';
import Profile from './components/profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const httpLink = createHttpLink({ uri: '/graphql' })

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
        <Router>
          <Navigationbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/createq" element={<CreateQ />}></Route>
            <Route path="/room" element={<answerQ />}></Route>
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
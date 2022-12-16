import './App.css';
import Home from './components/home';
import Navigationbar from './components/navbar';
import React from 'react';
import Login from './components/login'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import CreateQ from './components/createQ';
import AnswerQ from './components/answerQ';
import Profile from './components/profile';
import Store from './components/store';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import {io} from 'socket.io-client'

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
  // const socket = io('http://localhost:3001')
  // socket.emit("hello", { name: "John" });
  let socket = io(`https://toughdecisions.herokuapp.com:${process.env.PORT}`);
  return (
    <ApolloProvider client={client}>
      <div>
        <Router>
          <Navigationbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/answer" element={<AnswerQ socket={socket} />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/store" element={<Store />}></Route>
            <Route path="/createq" element={<CreateQ />}></Route>
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
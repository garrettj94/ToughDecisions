import './App.css'; 
import Home from './components/home';
import Navigationbar from './components/navbar';
import React from 'react';
import Login from './components/login'
function App() {
  return (
    <div>
        <Navigationbar />
        <Home />
        <Login />
    </div>
  );
}

export default App;
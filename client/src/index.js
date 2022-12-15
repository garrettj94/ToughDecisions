import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


// socket.on('joinSuccess', function (data) {
//   log('Joining the following game: ' + data.gameId);
//   });
  
  
//   //Response from Server on existing User found in a game
//   socket.on('alreadyJoined', function (data) {
//   log('You are already in an Existing Game: ' + data.gameId);
//   });
  
// socket.on('leftGame', function (data) {
//   log('Leaving Game ' + data.gameId);
//   });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);




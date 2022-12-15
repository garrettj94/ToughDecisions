import React from "react";
import { Form, Button, Card, CardGroup} from 'react-bootstrap';
import {io} from 'socket.io-client'
import { Link } from 'react-router-dom';


function Home() {

  const socket = io('http://localhost:3001');

  function joinGame(){
    socket.emit('joinGame');
    };

    function createGame(){
      socket.emit('createGame');
      };
    
    
   
    
    
    // const room = {
    //   id: uuid(),
    //   name: roomName,
    //   sockets: []
   

    //  };
    // var roomID = Math.random().toString(36).substring(2, 13);  
    //   io.emit('message', roomID);
    //   socket.on('subscribe', function(room) { 
    //     console.log('joining room', room);
    //     socket.join(room); 
    //     console.log(io.nsps['/'].adapter.rooms);  })
     
  



  return (
    <div className="home">
      <CardGroup>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Solo Game</Form.Label>
              </Form.Group>
              <Button variant="secondary" id="SoloPlaybtn"to="/answer" as={Link}
              > Play Game </Button>
            </Form>
            {/* <Card.Img variant="bottom" src="https://via.placeholder.com/300" /> */}
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
          <Form>
              <Form.Group>
                <Form.Label>Play With Friends!</Form.Label>
              </Form.Group>
              <Button variant="secondary"  id="CreateGameBtn" onClick={ 
               createGame

              } > Create Game </Button>
              <Button variant="secondary" id="JoinGameBtn" onClick={ 
               joinGame
              }> Join Game </Button>
            </Form>
            {/* <Card.Img variant="bottom" src="https://via.placeholder.com/300" /> */}
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default Home;
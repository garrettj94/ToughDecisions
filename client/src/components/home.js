import React from "react";
import { Form, Button, Card, CardGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Home({socket}) {

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
        <Card  >
          <Card.Body>
            <Form className="soloStart">
              <Form.Group>
                <Form.Label className="soloWords">Solo Game</Form.Label>
              </Form.Group>
              <Button className="soloPlayBtn" variant="secondary" id="SoloPlayBtn" to="/answer" as={Link}
              > Play Game </Button>
            </Form>
          </Card.Body>
        </Card>
        <Card>
        <Card.Body>
          <Form className="multiStart">
              <Form.Group >
                <Form.Label className="Friends">Play With Friends!</Form.Label>
              </Form.Group>
              <Button className='joinGameBtn' variant="secondary" id="JoinGameBtn"  to="/answer" as={Link}
              > Join Game </Button>
            </Form>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}
export default Home;
// <Button variant="secondary"  id="CreateGameBtn" onClick={
//   createGame
//  } > Create Game </Button>
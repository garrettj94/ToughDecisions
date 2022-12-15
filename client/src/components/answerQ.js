import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup, Button } from 'react-bootstrap';
// import { io,} from 'socket.io-client'

function AnswerQ() {
    // const socket = io('http://localhost:3001');

    // function leaveGame(){
    //     socket.emit('leaveGame');
    //     };

    

    return (
        <div  id='gameImg'>
            <CardGroup className='Game'>
                <Card border="light" className='choiceOne'>
                    <Card.Body >
                        <Button className='optionOne'>
                            Test to see size of font for adjustments
                        </Button>
                    </Card.Body>
                </Card>
                <Card border="light" className='choiceTwo'>
                    <Card.Body>
                        <Button className='optionTwo'>
                        Test to see size of font for adjustments
                        </Button>
                    </Card.Body>
                </Card>
            </CardGroup>

            <Button className='leaveBtn' variant='secondary'  to='/' as={Link}>
                <div id='leaveGameBtn'>leave game</div>
            </Button>

        </div>
    );
}
export default AnswerQ
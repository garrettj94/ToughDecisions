import React from 'react';
import { Card, CardGroup, Button } from 'react-bootstrap';
import { io,} from 'socket.io-client'

function answerQ() {
    const socket = io('http://localhost:3001');

    function leaveGame(){
        socket.emit('leaveGame');
        };

    return (
        <div>
            <CardGroup>
                <Card>
                    <Card.Body>
                        <Button>
                            {/* input choice 1 here */}
                        </Button>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Button>
                            {/* input choice 2 here */}
                        </Button>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Button onClick={ leaveGame
                            
                        }>
                            leave game
                        </Button>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    );
}
export default answerQ
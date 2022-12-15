import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup, Button } from 'react-bootstrap';
import { io,} from 'socket.io-client'

function AnswerQ() {
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
                        <Button as={Link} to="/" onClick={ leaveGame
                            
                        }>
                            leave game
                        </Button>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    );
}
export default AnswerQ
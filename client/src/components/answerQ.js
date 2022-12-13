import React from 'react';
import { Card, CardGroup, Button } from 'react-bootstrap';
function answerQ() {
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
            </CardGroup>
        </div>
    );
}
export default answerQ
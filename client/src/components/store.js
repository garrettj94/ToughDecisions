import React from "react";
import { Card, Row, Button } from "react-bootstrap"
function store() {
    return (
        <div id="main">
            <Row md={2}>
                <Card style={{ width: '20rem' }}>
                    <Card.Body>
                        <Card.Img variant="top" src="https://tinyurl.com/2hcrznzj" />
                        <Card.Title>1000 Doubloons</Card.Title>
                        <Card.Text>
                            A mediocre pile of doubloons. Should be enough to get you some cool cosmetics!
                        </Card.Text>
                        <Button variant="primary" href="#">$5.00</Button>
                        {/* <Button variant="primary" href="https://buy.stripe.com/6oEbIQbKhewv9FKcMM">$5.00</Button> */}
                    </Card.Body>
                </Card>
            </Row>
        </div>
    );
}

export default store
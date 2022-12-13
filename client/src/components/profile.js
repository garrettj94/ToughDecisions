import React from "react";
import { Card, CardGroup, Row } from "react-bootstrap";
function profile() {
    return (
        <div>
            <h1>User's Profile</h1>
            <img className="thumbnail" src="https://via.placeholder.com/150"></img>
            <br></br>
            <br></br>
            <Row md={3}>
                    <Card >
                        <Card.Body>Step on a bed of hot charcoal</Card.Body>
                    </Card>
                    <Card >
                        <Card.Body>Step on a bed of hot charcoal</Card.Body>
                    </Card>
                    <Card >
                        <Card.Body>Step on a bed of hot charcoal</Card.Body>
                    </Card>
                    <Card >
                        <Card.Body>Step on a bed of hot charcoal</Card.Body>
                    </Card>
                    <Card >
                        <Card.Body>Step on a bed of hot charcoal</Card.Body>
                    </Card>
            </Row>
        </div>
    );
}

export default profile
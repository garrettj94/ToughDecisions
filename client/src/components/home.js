import React from "react";
import { Card, CardGroup} from 'react-bootstrap';
function Home() {
  return (
    <div className="home">
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title>Play Solo</Card.Title>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Play With Friends</Card.Title>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default Home;
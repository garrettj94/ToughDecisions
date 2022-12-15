import React from "react";
import { Card, CardGroup} from 'react-bootstrap';
function Home() {
  return (
    <div className="home">
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>Play Solo</Card.Title>
              <Card.Img className="d-block mx-auto" variant="bottom" src="https://via.placeholder.com/300" />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Play With Friends</Card.Title>
              <Card.Img className="d-block mx-auto" variant="bottom" src="https://via.placeholder.com/300" />
            </Card.Body>
          </Card>
        </CardGroup>
    </div>
  );
}

export default Home;
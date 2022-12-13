import React from "react";
import { Form, Button, Card } from 'react-bootstrap';
function createQ() {
  return (
    <Card>
      <Form>
        <Form.Group controlId="createQuestion">
          <Form.Label>New Question</Form.Label>
          <Form.Control type="text" placeholder="Enter your Question" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default createQ
import React from "react";
import { Form, Button } from 'react-bootstrap';
function createQ() {
    return (
        <Form>
        <Form.Group controlId="createQuestion">
          <Form.Label>New Question</Form.Label>
          <Form.Control type="text" placeholder="Enter your Question" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
}

export default createQ
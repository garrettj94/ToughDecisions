import React from "react";
import { Form, Button, Card, CardGroup } from 'react-bootstrap';

function Login() {
  return (
    <div className="login">
      <CardGroup>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group controlId="loginformEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Example@email.com" />
              </Form.Group>
              <Form.Group controlId="loginformPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="secondary" type="submit"> Login </Button>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group controlId="signupformEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Example@email.com" />
              </Form.Group>
              <Form.Group controlId="signupformPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="secondary" type="submit"> Sign Up </Button>
            </Form>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default Login;
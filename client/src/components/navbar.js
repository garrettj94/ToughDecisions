import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';

function Navigationbar() {
  return (
    <nav>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#store">Store</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </nav>
  );
}
export default Navigationbar;
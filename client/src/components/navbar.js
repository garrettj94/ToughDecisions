import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

function Navigationbar() {
  const [expanded, setExpanded] = useState(false)
  return (
    <nav>
      <Navbar expanded={expanded} sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Container>
            <Nav className="me-auto" onClick={() => setExpanded(expanded ? false : "expanded")}>
              <Nav.Link to="/" as={Link}>Home</Nav.Link>
              <Nav.Link to="/store" as={Link}>Store</Nav.Link>
              <Nav.Link to="/profile" as={Link}>Profile</Nav.Link>
              <Nav.Link to="/login" as={Link}>Login / Sign Up</Nav.Link>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
}
export default Navigationbar;
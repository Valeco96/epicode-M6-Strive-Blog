import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";

//aggiungiamo il token dal local storage e mostriamo i pulsanti diversi a seconda che l'utente sia autenticato o meno:
function BNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); //controlla se l'utente é loggato

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); //reindirizza al login
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          Strive Blog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token && (
              <>
                <Nav.Link>Profilo Autore</Nav.Link>
                <Nav.Link to="/PostForm" as={Link}>
                  Crea Post
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
            {!token && (
              <>
                <Nav.Link to="/Login" as={Link}>
                  Login
                </Nav.Link>
                <Nav.Link to="/Register" as={Link}>
                  Registrati
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BNavbar;

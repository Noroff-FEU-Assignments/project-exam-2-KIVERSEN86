import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useToken } from "../../../states/userStore";
import { LogoutBtn } from "../../Auth/LogoutBtn";

function DefaultNav() {
  const token = useToken();

  console.log("token", token);

  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Brand href="#home">SocialPlatform</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto link-styling">
            <Nav.Link>{!token ? <Link to="/">Home</Link> : <Link to="/homeloggedin">Home</Link>}</Nav.Link>
            <Nav.Link>
              <Link to="/profiles">Profiles</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/posts">Posts</Link>
            </Nav.Link>
          </Nav>
          <Nav>
            {!token ? (
              <>
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/signup">Sign up</Link>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link>
                <LogoutBtn />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DefaultNav;

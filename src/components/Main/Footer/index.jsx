import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function Footer() {
  return (
    <div className="container-footer">
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/profiles">Profiles</Link>
        <Link to="/contact">Contact</Link>
      </Nav>
    </div>
  );
}

export default Footer;

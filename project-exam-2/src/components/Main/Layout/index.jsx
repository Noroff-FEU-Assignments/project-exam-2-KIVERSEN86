import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";

function Layout() {
  return (
    <Container>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
}

export default Layout;

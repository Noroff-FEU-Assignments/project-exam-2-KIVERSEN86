import Container from "react-bootstrap/esm/Container";
import { HomeForm, SignupForm } from "../Form";

function Home() {
  return (
    <Container>
      <div className="home-container-welcome">
        <h1>Welcome to SocialPlatform</h1>
        <h2 className="home-h2">The platform that connects you to humankind</h2>
      </div>
      <div className="home-container-signup"></div>
      <HomeForm />
      <hr />
      <h3 className="home-h3">New to SocialPlatform? Join now to explore our world</h3>
      <SignupForm />
    </Container>
  );
}

export default Home;

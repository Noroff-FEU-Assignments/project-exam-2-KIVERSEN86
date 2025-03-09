import Container from "react-bootstrap/esm/Container";
import RegisterForm from "../../components/Form/RegisterForm";

function Register() {
  return (
    <Container>
      <div className="home-container-welcome">
        <h1>Welcome to SocialPlatform</h1>
        <h2 className="home-h2">The platform that connects you to humankind</h2>
      </div>
      <div className="home-container-signup"></div>
      <h3 className="home-h3">New to SocialPlatform? Register your account below and join our world</h3>
      <RegisterForm />
    </Container>
  );
}

export default Register;

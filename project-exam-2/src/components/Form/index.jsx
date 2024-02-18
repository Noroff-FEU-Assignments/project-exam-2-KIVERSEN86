import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function HomeForm() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <div className="d-grid gap-2">
        <Button className="btn-home-form" variant="primary" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
}

export function SignupForm() {
  return (
    <Form>
      <div className="container-signup d-grid gap-2">
        <Button className="btn-signup" variant="primary" type="submit">
          Sign up
        </Button>
      </div>
    </Form>
  );
}

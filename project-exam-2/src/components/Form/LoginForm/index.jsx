import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../Error/errorMessage";
import ServerError from "../../Error/serverError";
import { useState } from "react";
import { Login_Url } from "../../../constants/api";
import { userActions } from "../../../states/userStore";

const schema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setUser } = userActions();

  const navigate = useNavigate();

  console.log(setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  async function onSubmit(data) {
    console.log(data);

    const options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(Login_Url, options);
      const json = await response.json();

      if (!response.ok) {
        return setError(json.errors?.[0]?.message ?? "There was an error");
      }

      setUser(json.data);
      navigate("/homeloggedin");
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isLoading}>
        {error && <ServerError>{error}</ServerError>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email")} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password")} />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </Form.Group>

        <div className="d-grid gap-2">
          <Button className="btn-home-form" variant="primary" type="submit">
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </fieldset>
    </Form>
  );
}

export function SignupForm() {
  return (
    <Form>
      <div className="home-container-signup d-grid gap-2">
        <Button className="btn-signup" variant="primary" type="submit">
          Sign up
        </Button>
      </div>
    </Form>
  );
}

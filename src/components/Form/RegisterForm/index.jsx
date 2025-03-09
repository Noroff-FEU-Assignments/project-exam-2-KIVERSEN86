import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../Error/errorMessage";
import ServerError from "../../Error/serverError";
import { useState } from "react";
import { Register_Url } from "../../../constants/api";
import { userActions } from "../../../states/userStore";

const schema = yup
  .object({
    name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    email: yup
      .string()
      .email()
      .required("Email is required")
      .matches(/^[\w-.]+@stud\.noroff\.no$/, "Email must be a student.noroff.no address"),
    password: yup.string().required("Password is required"),
  })
  .required();

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = userActions();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);
    const options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(Register_Url, options);
      const json = await response.json();

      if (!response.ok) {
        return setError(json.errors?.[0]?.message ?? "Registration failed");
      }

      setUser(json.data);
      navigate("/");
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
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" {...register("name")} />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </Form.Group>
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
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </fieldset>
    </Form>
  );
}

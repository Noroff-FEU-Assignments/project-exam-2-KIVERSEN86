import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useToken } from "../../states/userStore";
import { API_KEY, POST_URL } from "../../constants/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../Error/errorMessage";
import ServerError from "../Error/serverError";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    title: yup.string().required("A title is required"),
    body: yup.string().required("Content is required"),
  })
  .required();

function AddPostForm() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(data),
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(POST_URL, options);
      const json = await response.json();

      if (!response.ok) {
        return setError(json.errors?.[0]?.message ?? "There was an error");
      }

      navigate(0);
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form-add-post">
      <fieldset disabled={isLoading}>
        {error && <ServerError>{error}</ServerError>}
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" {...register("title")} />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label>Content</Form.Label>
          <Form.Control type="text" placeholder="Content" {...register("body")} />
          {errors.body && <ErrorMessage>{errors.body.message}</ErrorMessage>}
        </Form.Group>

        <div className="d-grid gap-2">
          <Button className="btn-home-form" variant="primary" type="submit">
            {isLoading ? "Adding post..." : "Add post"}
          </Button>
        </div>
      </fieldset>
    </Form>
  );
}

export default AddPostForm;

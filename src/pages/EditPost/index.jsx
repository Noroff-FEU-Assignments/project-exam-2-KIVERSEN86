import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useToken } from "../../states/userStore";
import { API_KEY, POST_URL } from "../../constants/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../../components/Error/errorMessage";
import ServerError from "../../components/Error/serverError";

const schema = yup
  .object({
    title: yup.string().required("A title is required"),
    body: yup.string().required("Content is required"),
  })
  .required();

async function fetchPost(postId, token) {
  const response = await fetch(`${POST_URL}/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  const json = await response.json();
  return json.data;
}

async function updatePost(postId, data, token) {
  const response = await fetch(`${POST_URL}/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("You can not edit a post that is not yours");
  }

  return response.json();
}

function EditPost() {
  const { postId } = useParams();
  const token = useToken();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId, token),
    enabled: !!postId,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updatePost(postId, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("body", post.body);
    }
  }, [post, setValue]);

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load post.</div>;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form-edit-post">
      <fieldset disabled={updateMutation.isLoading}>
        {updateMutation.isError && <ServerError>{updateMutation.error.message}</ServerError>}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" {...register("title")} />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control type="text" {...register("body")} />
          {errors.body && <ErrorMessage>{errors.body.message}</ErrorMessage>}
        </Form.Group>
        <Button variant="primary" type="submit">
          {updateMutation.isLoading ? "Saving..." : "Update Post"}
        </Button>
      </fieldset>
    </Form>
  );
}

export default EditPost;

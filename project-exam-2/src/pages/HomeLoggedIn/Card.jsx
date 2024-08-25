import { useQuery, useMutation } from "@tanstack/react-query";
import { POST_URL, API_KEY } from "../../constants/api";
import { useToken } from "../../states/userStore";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import AddPostForm from "../../components/Posts/AddPost";

async function getPosts(token) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  const response = await fetch(POST_URL, options);

  if (!response.ok) {
    throw new Error("There was an error fetching the posts");
  }

  const responseData = await response.json();
  console.log(responseData);

  return responseData.data;
}

async function deletePost(id, token) {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  const response = await fetch(`${POST_URL}/${id}`, options);

  if (!response.ok) {
    throw new Error("There was an error deleting the post");
  }

  return response.json();
}

function PostContainer() {
  const token = useToken();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(token),
    staleTime: 1000 * 60 * 5,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id, token),
    onSuccess: ({ variables }) => {
      data?.map((post) => {
        if (post.id === variables.id) {
          return null;
        }
        return post;
      });
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return `An error has occurred: ${error.message}`;

  return (
    <div>
      {data?.map((post) => (
        <Card style={{ width: "22rem" }} key={post.id} className="card-container">
          <Card.Header>
            <Card.Img></Card.Img>
          </Card.Header>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
            <Button onClick={() => handleDelete(post.id)} className="btn-delete">
              Delete Post
            </Button>
          </Card.Body>
        </Card>
      ))}
      <AddPostForm />
    </div>
  );
}

export default PostContainer;

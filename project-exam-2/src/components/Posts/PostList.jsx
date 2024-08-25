import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { POST_URL, API_KEY } from "../../constants/api";
import { useToken, userId } from "../../states/userStore";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

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

  const jsonData = await response.json();
  return jsonData.data;
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

function PostList() {
  const token = useToken();
  const uId = userId();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(token),
    staleTime: 1000 * 60 * 5,
  });

  const removePost = useMutation({
    mutationFn: (id) => deletePost(id, token),
    onSuccess: () => {
      console.log("Delete successful:", data);
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const deleteOwnPost = (id) => {
    removePost.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      {data?.map((post) => (
        <Card key={post.id} className="card-container">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
            {post.myId === uId && (
              <Button onClick={() => deleteOwnPost(post.id)} className="btn btn-delete">
                Delete post
              </Button>
            )}
            <Button className="btn">
              <Link to={`/posts/${post.id}`}>View Post</Link>
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default PostList;

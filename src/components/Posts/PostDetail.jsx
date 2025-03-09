import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useToken } from "../../states/userStore";
import { API_KEY, POST_URL } from "../../constants/api";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";

async function getPost(token, id) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(`${POST_URL}/${id}`, options);

  if (!response.ok) {
    throw new Error("There was an error fetching the profile");
  }

  const responseData = await response.json();
  console.log(responseData);

  return responseData.data;
}

function PostDetail() {
  const token = useToken();
  const { id } = useParams();

  const dateFormatter = (Datechanger) => {
    return new Date(Datechanger).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(token, id),
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data && (
        <Container>
          <Card className="post-specific-card">
            <Card.Body>
              <Card.Title>Title: {data.title}</Card.Title>
              <Card.Text>{data.body}</Card.Text>
              <Card.Text>Post created: {dateFormatter(data.created)}</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
}

export default PostDetail;

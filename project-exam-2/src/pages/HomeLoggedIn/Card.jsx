import { useQuery } from "@tanstack/react-query";
import { POST_URL, API_KEY } from "../../constants/api";
import { useToken } from "../../states/userStore";
import Card from "react-bootstrap/Card";

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

  const responeData = await response.json();
  console.log(responeData);

  return responeData.data;
}

function PostContainer() {
  const token = useToken();

  const { isPending, error, data } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => getPosts(token),
    staleTime: 1000 * 60 * 5,
  });
  if (isPending) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data?.map((post) => {
        return (
          <Card className="card-container" key={post.id}>
            <Card.Header>
              <Card.Img roundedCircle></Card.Img>
            </Card.Header>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default PostContainer;

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useToken } from "../../states/userStore";
import { API_KEY, PROFILE_URL } from "../../constants/api";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";

async function getProfile(token, name) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(`${PROFILE_URL}/${name}`, options);

  if (!response.ok) {
    throw new Error("There was an error fetching the profile");
  }

  const responseData = await response.json();
  console.log(responseData);

  return responseData.data;
}

function ProfileDetail() {
  const token = useToken();
  const { name } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", name],
    queryFn: () => getProfile(token, name),
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Container>
        {data && (
          <Container className="container-profile">
            <h1>Profile Page</h1>
            <img className="banner-img" src={data.banner.url}></img>
            <Card style={{ width: "18rem" }} className="profile-details">
              <Card.Img variant="top" src={data.avatar.url} />
              <Card.Body>
                <Card.Title>Name: {data.name}</Card.Title>
                <Card.Text>Email: {data.email}</Card.Text>
              </Card.Body>
            </Card>
          </Container>
        )}
      </Container>
    </>
  );
}

export default ProfileDetail;

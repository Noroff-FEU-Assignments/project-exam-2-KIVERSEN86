import { useQuery } from "@tanstack/react-query";
import { PROFILE_URL, API_KEY } from "../../constants/api";
import { useToken } from "../../states/userStore";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { followStore } from "../../states/followStore";

async function getProfiles(token) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  const response = await fetch(PROFILE_URL, options);

  if (!response.ok) {
    throw new Error("There was an error fetching the profiles");
  }

  const responseData = await response.json();
  return responseData.data;
}

function ProfileList() {
  const token = useToken();
  const { isPending, error, data } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => getProfiles(token),
    staleTime: 1000 * 60 * 5,
  });

  const { followUser, unfollowUser, isFollowing } = followStore();

  const handleFollow = (profile) => {
    if (isFollowing(profile.name)) {
      unfollowUser(profile.name);
    } else {
      followUser(profile.name);
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data?.map((profile) => (
        <Card className="card-container" key={profile.name}>
          <Card.Header>
            <Card.Img></Card.Img>
          </Card.Header>
          <Card.Body>
            <Card.Title>Name: {profile.name}</Card.Title>
            <Card.Text>Email: {profile.email}</Card.Text>
            <Card.Text>{profile.bio}</Card.Text>
            <Button className="btn-profile">
              <Link to={`/profiles/${profile.name}`}>View Profile</Link>
            </Button>
            <Button className="btn-profile" onClick={() => handleFollow(profile)}>
              {isFollowing(profile.name) ? "Unfollow" : "Follow"}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ProfileList;

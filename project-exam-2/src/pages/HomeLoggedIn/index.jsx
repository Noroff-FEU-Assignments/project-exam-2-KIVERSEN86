import Container from "react-bootstrap/esm/Container";
import PostContainer from "../HomeLoggedIn/Card";
import ProfileCard from "./ProfileCard";

function HomeLoggedIn() {
  return (
    <Container className="container-loggedin">
      <ProfileCard />
      <PostContainer />
    </Container>
  );
}

export default HomeLoggedIn;

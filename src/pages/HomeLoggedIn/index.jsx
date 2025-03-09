import Container from "react-bootstrap/esm/Container";
import PostContainer from "../HomeLoggedIn/Card";
import ProfileCard from "./ProfileCard";

function HomeLoggedIn() {
  return (
    <Container>
      <div className="container-loggedin">
        <ProfileCard />
        <PostContainer />
      </div>
    </Container>
  );
}

export default HomeLoggedIn;

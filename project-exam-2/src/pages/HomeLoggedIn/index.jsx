import Container from "react-bootstrap/esm/Container";
import PostContainer from "../HomeLoggedIn/Card";
import ProfileCard from "./ProfileCard";
import AddPostForm from "../../components/Posts/AddPost";

function HomeLoggedIn() {
  return (
    <Container className="container-loggedin">
      <ProfileCard />
      <AddPostForm />
      <PostContainer />
    </Container>
  );
}

export default HomeLoggedIn;

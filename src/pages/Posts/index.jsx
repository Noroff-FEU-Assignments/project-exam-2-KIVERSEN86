import Container from "react-bootstrap/esm/Container";
import PostList from "../../components/Posts/PostList";

function Posts() {
  return (
    <Container>
      <h1 className="h1-styles">Posts</h1>
      <PostList />
    </Container>
  );
}

export default Posts;

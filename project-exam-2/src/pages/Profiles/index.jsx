import Container from "react-bootstrap/esm/Container";
import ProfileList from "../../components/Profiles/ProfileList";

function Profiles() {
  return (
    <Container>
      <h1 className="h1-styles">Profiles</h1>
      <ProfileList />
    </Container>
  );
}

export default Profiles;

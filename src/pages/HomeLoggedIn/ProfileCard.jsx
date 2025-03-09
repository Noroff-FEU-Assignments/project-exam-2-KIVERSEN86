import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function ProfileCard() {
  return (
    <Card className="profile-card" style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Kristoffer Iversen</Card.Title>
        <Card.Text>Lørenskog, Norway</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Bama Gruppen AS</ListGroup.Item>
        <ListGroup.Item>Married</ListGroup.Item>
      </ListGroup>
      <Button className="btn-profile-card" variant="primary">
        View profile
      </Button>
    </Card>
  );
}

export default ProfileCard;

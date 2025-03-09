import { useNavigate } from "react-router-dom";
import { userActions } from "../../../states/userStore";
import Button from "react-bootstrap/Button";

export function LogoutBtn() {
  const { clearUser } = userActions();

  const navigate = useNavigate();

  function doLogout() {
    clearUser();
    navigate("/");
  }
  return (
    <Button variant="primary" onClick={doLogout}>
      Logout
    </Button>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { USERS } from "../constants/users";

export const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const userToDisplay = userId
    ? USERS.find((user) => user.userId === parseInt(userId))
    : null;

  if (!userToDisplay) {
    return <div>Cannot display user data.</div>;
  }

  return (
    <section>
      <h3>User data</h3>
      <div>Name: {userToDisplay.name}</div>
      <div>Gender: {userToDisplay.gender}</div>
      <button onClick={() => navigate("/users")}>Go back to users list</button>
    </section>
  );
};

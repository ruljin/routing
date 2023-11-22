import { Link } from "react-router-dom";
import { USERS } from "../constants/users";

export const UsersList = () => (
  <div>
    <h3>Users list</h3>
    {USERS.map((user) => (
      <Link key={user.name} to={`/users/${user.userId}`}>
        {user.name}
      </Link>
    ))}
  </div>
);

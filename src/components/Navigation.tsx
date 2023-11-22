import { NavLink } from "react-router-dom";

export const Navigation = () => (
  <nav>
    <NavLink
      // className={({ isActive }) => (isActive ? "active" : "")}
      to="/"
    >
      Home
    </NavLink>
    <NavLink
      // className={({ isActive }) => (isActive ? "active" : "")}
      to="/users"
    >
      Users
    </NavLink>
    <NavLink
      // className={({ isActive }) => (isActive ? "active" : "")}
      to="/technologies"
    >
      Technologies
    </NavLink>
  </nav>
);

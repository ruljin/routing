import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Users } from "./components/Users";
import { UsersList } from "./components/UsersList";
import { User } from "./components/User";
import { Technologies } from "./components/Technologies";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />}>
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<User />} />
        </Route>
        <Route path="/technologies" element={<Technologies />} />
      </Routes>
    </div>
  );
}

export default App;


import "./Navbar.css";
import { useState } from "react";
import AddModal from "./AddModal";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";

function Navbar({ setIsAuthenticated, isAuthenticated }) {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5000/api/v1/user/current", {
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((res) => {
      setCurrentUser(res.data.username);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    history.push("/login");
  };
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <ul>
        {isAuthenticated && (
          <>
            <li onClick={() => setOpen(true)}>Add</li>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/user">
              <li>Profile</li>
            </Link>
            <li
              onClick={() => {
                logout();
              }}
            >
              Logout
            </li>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login">
              <li>Login</li>
            </Link>
            <Link to="/signUp">
              <li>SignUp</li>
            </Link>
          </>
        )}
      </ul>
      {open ? (
        <AddModal currentUser={currentUser} setOpen={setOpen} open={open} />
      ) : (
        ""
      )}
    </nav>
  );
}

export default Navbar;

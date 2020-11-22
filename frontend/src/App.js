import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";

import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import PostDetail from "./PostDetail";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <Router>
      <Navbar
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
      <Switch>
        <Route
          exact
          path="/signUp"
          render={(props) => {
            return !isAuthenticated ? (
              <SignUp {...props} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          exact
          path="/login"
          render={(props) => {
            return !isAuthenticated ? (
              <Login {...props} setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          exact
          path="/"
          render={(props) => {
            return isAuthenticated ? (
              <Home {...props} />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        <Route exact path="/detail" component={PostDetail} />
      </Switch>
    </Router>
  );
}

export default App;

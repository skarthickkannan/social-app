import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const login = {
        email: email,
        password: password,
      };
      await axios
        .post("http://localhost:5000/api/v1/user/login", login)
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            setIsAuthenticated(true);
            history.push("/");
          }
        });
      setLoading(false);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  return (
    <div className="form">
      {loading && <h1 className="loader">loading</h1>}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <h3>
            Login <span className="under"></span>
          </h3>
          {errors && (
            <p
              style={{
                border: "1px solid hsl(360, 67%, 44%)",
                padding: "1rem 0.5rem",
                margin: "0.3rem auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                background: "hsl(360, 71%, 66%)",
                color: "white",
              }}
            >
              {errors}
            </p>
          )}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;

import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newUser = {
        username: username,
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      };
      await axios
        .post("http://localhost:5000/api/v1/user/register", newUser)
        .then((res) => {
          if (res.data.success) {
            history.push("/login");
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
        <form onSubmit={handleSubmit} autoComplete="on">
          <h3>
            Sign Up <span className="under"></span>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
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
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repeat Password"
          />
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}

export default SignUp;

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "./autservice";
// import Navi from "../layouts/Navi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    AuthService.login(email, password)
      .then((response) => {
        setLoading(false);
        setRedirectToDashboard(true);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  if (redirectToDashboard) {
    return <Redirect to="/home" />;
  }

  return (
    
    <div className="containerr">
      
  {/* <Navi/> */}
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card mt-5">
        <div className="card-header">
          <h4>Login</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <a href="/home">HOME</a>
</div>
  );
};

export default Login;

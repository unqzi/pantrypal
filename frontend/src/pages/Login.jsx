import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [tab, setTab] = useState("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/inventory");
    }
  }, []);

  function handleLogin() {
    api.post("/users/login", { username, password }).then((response) => {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/inventory");
    });
  }

  return (
    <div className="login-page">
      <h1 className="login-title">
        PANTRYpal<span className="login-dot">.</span>
      </h1>
      <p className="login-sub">
        Your kitchen, in sync. in the palm of your hands
      </p>
      <div className="tab-switcher">
        <button
          className={tab === "signin" ? "tab active" : "tab"}
          onClick={() => setTab("signin")}
        >
          Sign in
        </button>
        <button
          className={tab === "join" ? "tab active" : "tab"}
          onClick={() => setTab("join")}
        >
          Join household
        </button>
      </div>
      <div className="field-group">
        <label>USERNAME</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="field-group">
        <label>PASSWORD</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-btn" type="submit" onClick={handleLogin}>
        Sign in
      </button>
      <p className="login-footer">
        New here?
        <span className="login-link" onClick={() => setTab("join")}>
          Create a household
        </span>
      </p>
    </div>
  );
}

export default Login;

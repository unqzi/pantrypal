import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    api.post("/users/login", { username, password }).then((response) => {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/inventory");
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;

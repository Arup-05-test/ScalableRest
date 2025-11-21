import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("auth/login", { email, password });

      console.log("Login response:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user.id); 

        nav("/dashboard");
      

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Server not responding");
      }
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit}>
        <input 
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /><br/>

        <input 
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        /><br/>

        <button>Login</button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    try {
      const res = await API.post("auth/register", { name, email, password });
      console.log("Registered:", res.data);
        nav("/login");

    } catch (err) {
      if (err.response) {
        // API returned an error response
        setError(err.response.data.msg || "Registration failed");
      } else if (err.request) {
        // Request made but no response
        setError("Server not responding");
      } else {
        // Other errors
        setError("Unexpected error");
      }
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* show errors */}
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

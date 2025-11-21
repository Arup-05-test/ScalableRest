import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "admin") {
        nav("/admin");
      } else if (role === "user") {
        nav("/dashboard");
      }
    }
  }, [nav]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Welcome to Task Manager</h2>
      <p>Please <a href="/login">Login</a> or <a href="/register">Register</a> to continue.</p>
    </div>
  );
}

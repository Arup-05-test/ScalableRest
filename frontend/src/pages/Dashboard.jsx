import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const nav = useNavigate();
console.log("LocalStorage userId:", localStorage.getItem("userId"));

  // initialize user info from localStorage
const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
const [role, setRole] = useState(localStorage.getItem("role") || "");

  const token = localStorage.getItem("token");

  // redirect to login if missing token/userId
  useEffect(() => {
    if (!token || !userId || !role) nav("/login");
  }, [token, userId, role, nav]);

  // Fetch tasks
  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // CREATE task
  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setError("");
    setSuccess("");

    try {
      await API.post(
        "/tasks",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      setSuccess("Task created successfully");
      loadTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to create task");
    }
  };

  // DELETE task
  const deleteTask = async (taskId, taskOwnerId) => {
    setError("");
    setSuccess("");

    if (role === "user" && taskOwnerId !== userId) {
      setError("You can only delete your own tasks");
      return;
    }

    try {
      await API.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Task deleted successfully");
      loadTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  // Wait until userId is loaded
  if (!userId) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      <p>Logged in as: <b>{role}</b></p>
      <button onClick={logout} style={{ marginBottom: 20, padding: "6px 12px" }}>Logout</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* CREATE TASK FORM */}
      <form onSubmit={createTask} style={{ marginBottom: 20 }}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />
        <button type="submit">Add Task</button>
      </form>

      <h3>Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((t) => {
          const taskOwnerId = t.user?._id ? t.user._id.toString() : t.user.toString();
          const canDelete = role === "admin" || taskOwnerId === userId;

          console.log("Task owner:", taskOwnerId, "Logged user:", userId, "Can delete:", canDelete);

          return (
            <div key={t._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, padding: 10, border: "1px solid #ccc", borderRadius: 6 }}>
              <span>
                <b>{t.title}</b>: {t.description}{" "}
                {role === "admin" && `(User: ${t.user.name || t.user})`}
              </span>
              {canDelete && (
                <button onClick={() => deleteTask(t._id, taskOwnerId)} style={{ background: "red", color: "white", border: "none", padding: "6px 10px", borderRadius: 4 }}>
                  Delete
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

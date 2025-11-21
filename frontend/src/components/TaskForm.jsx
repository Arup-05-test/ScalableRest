import { useState } from "react";
import API from "../api/axios";

export default function TaskForm({ reload }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  const create = async (e) => {
    e.preventDefault();
    await API.post("/tasks/create", { title, description });
    setTitle("");
    setDesc("");
    reload();
  };

  return (
    <form onSubmit={create} style={{ marginTop: 20 }}>
      <h3>Create Task</h3>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <input placeholder="Description" value={description} onChange={(e) => setDesc(e.target.value)} /><br />
      <button>Create</button>
    </form>
  );
}

import API from "../api/axios";

export default function TaskList({ tasks, reload }) {
  const del = async (id) => {
    await API.delete(`/tasks/${id}`);
    reload();
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Your Tasks</h3>
      {tasks.map((t) => (
        <div key={t._id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
          <h4>{t.title}</h4>
          <p>{t.description}</p>
          <button onClick={() => del(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}


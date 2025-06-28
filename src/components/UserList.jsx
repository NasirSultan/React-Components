import React, { useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = () => {
    setLoading(true);
    setError("");

    const worker = new Worker(
      new URL("../workers/userWorker.js", import.meta.url)
    );

    worker.postMessage({ type: "FETCH_USERS" });

    worker.onmessage = (e) => {
      const { status, users, message } = e.data;

      if (status === "success") {
        setUsers(users);
      } else {
        setError("Error: " + message);
      }

      setLoading(false);
      worker.terminate();
    };
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">User List (Filtered by Age {'>'} 30)</h2>
      <button
        onClick={fetchUsers}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Loading..." : "Fetch Users"}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      <ul className="mt-4 max-h-80 overflow-auto border p-2">
       {users.map((user, index) => (
  <li key={`${user.id}-${index}`}>
    {user.firstName} {user.lastName}
  </li>
))}

      </ul>
    </div>
  );
}
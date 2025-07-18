// src/components/UserComponent.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE } from './config/api';

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    loadSessionUser();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(API_BASE);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch users:', err.message);
    }
  };

  const loadSessionUser = () => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setSessionUser(JSON.parse(storedUser));
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    if (!name || !email) return alert('Both fields are required');

    setLoading(true);
    try {
      const { data } = await axios.post(API_BASE, { name, email });
      sessionStorage.setItem('user', JSON.stringify(data));
      setSessionUser(data);
      setForm({ name: '', email: '' });
      fetchUsers();
    } catch (err) {
      console.error('Failed to add user:', err.message);
      alert('Error adding user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Delete failed:', err.message);
      alert('Failed to delete user.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>

      {sessionUser && (
        <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded">
          Session User: <strong>{sessionUser.name}</strong> ({sessionUser.email})
        </div>
      )}

      <h3 className="text-xl font-semibold mt-8">All Users</h3>
      <ul className="mt-4 space-y-2">
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user._id}
              className="border-b pb-2 flex justify-between items-center"
            >
              <div>
                <strong>{user.name}</strong> — {user.email}
              </div>
              <div className="space-x-3 text-sm">
                <Link
                  to={`/update/${user._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user._id)}
                  disabled={deletingId === user._id}
                  className="text-red-600 hover:underline"
                >
                  {deletingId === user._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default UserComponent;

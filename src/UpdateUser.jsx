// src/components/UpdateUser.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { API_BASE } from './config/api';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(API_BASE);
        const user = data.find((u) => u._id === id);
        if (user) setForm({ name: user.name, email: user.email });
      } catch (err) {
        console.error('Failed to load user:', err.message);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_BASE}/${id}`, form);
      navigate('/');
    } catch (err) {
      console.error('Update failed:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;

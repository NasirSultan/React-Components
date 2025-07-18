import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API = "http://localhost:3000";

function App() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);
  const [dashboardData, setDashboardData] = useState("");
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/check-auth`)
      .then((res) => {
        if (res.data.authenticated) {
          setAuth(true);
        }
      })
      .catch(() => setAuth(false));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/login`, form);
      setMessage(res.data.message);
      setAuth(true);
    } catch {
      setMessage("Login failed");
    }
  };

  const handleLogout = async () => {
    await axios.post(`${API}/logout`);
    setAuth(false);
    setMessage("Logged out");
    setDashboardData("");
    setProfileData("");
  };

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${API}/dashboard`);
      setDashboardData(res.data.message);
    } catch {
      setDashboardData("Unauthorized. Please log in.");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/profile`);
      setProfileData(res.data.user);
      setMessage("Profile fetched successfully");
    } catch (err) {
      setProfileData("Access denied");
      setMessage("You must log in to access profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Session Auth Demo</h2>

        {auth ? (
          <>
            <div className="space-y-4">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>

              <button
                onClick={fetchDashboard}
                className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
              >
                Fetch Dashboard
              </button>
              <p className="text-gray-700">{dashboardData}</p>

             
            
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>

            <button
              onClick={fetchProfile}
              className="w-full mt-4 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
            >
              Try to Fetch Profile Without Login
            </button>
          </>
        )}

        {message && (
          <div className="text-center text-sm text-blue-600 mt-2">{message}</div>
        )}
      </div>
    </div>
  );
}

export default App;

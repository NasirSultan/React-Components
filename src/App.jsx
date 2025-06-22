import React, { useState } from 'react';
import Login from './components/withLogger';
import Dashboard from './components/Dashboard';
import withAuth from './components/withAuth';

const ProtectedDashboard = withAuth(Dashboard);

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);
  const handleLogin = (userObj) => setUser(userObj);

  return (
    <div className="min-h-screen p-6 bg-gray-100 space-y-6 font-sans">
      <h1 className="text-3xl font-bold">React Auth with HOC</h1>

      {user ? (
        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Log Out
          </button>

          <ProtectedDashboard user={user} />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

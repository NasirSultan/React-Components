// src/App.js
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import withAuth from './components/withAuth';

const ProtectedDashboard = withAuth(Dashboard);

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const toggleLogin = () => {
    if (loggedInUser) {
      setLoggedInUser(null); // Log out
    } else {
      setLoggedInUser({ name: 'John Doe' }); // Log in
    }
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">My React App</h1>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={toggleLogin}
      >
        {loggedInUser ? 'Log Out' : 'Log In'}
      </button>

      <ProtectedDashboard user={loggedInUser} />
    </div>
  );
}

export default App;

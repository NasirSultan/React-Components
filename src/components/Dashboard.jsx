// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ user }) => {
  return (
    <div className="p-4 bg-green-100 rounded">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <p>Welcome, {user.name}!</p>
    </div>
  );
};

export default Dashboard;

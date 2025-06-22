import React from 'react';

const Dashboard = ({ user }) => {
  return (
    <div className="p-4 bg-green-100 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-green-800">Dashboard</h2>
      <p className="text-lg">
        Welcome, <span className="font-semibold">{user.name}</span>!
      </p>
    </div>
  );
};

export default Dashboard;

import React from "react";
import UserList from "./components/UserList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">User Fetcher</h1>
        <UserList />
      </div>
    </div>
  );
}

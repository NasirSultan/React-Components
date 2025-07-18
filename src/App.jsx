// ✅ App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserComponent from './UserComponent';
import UpdateUser from './UpdateUser';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserComponent />} />
      <Route path="/update/:id" element={<UpdateUser />} />
    </Routes>
  );
};

export default App;

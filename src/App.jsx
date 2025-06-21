// src/App.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import CounterTest from './features/counter/CounterTest';

const App = () => {
  const count = useSelector((state) => state.counter.value);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <h1 className="text-2xl font-bold mb-4">Redux Toolkit Counter App</h1>
      <p className="text-lg mb-6">Current Count (from App): <span className="font-semibold">{count}</span></p>
      <CounterTest />
    </div>
  );
};

export default App;

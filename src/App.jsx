import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SendAmountForm from './components/SendAmountForm';
import ReceiveAmountForm from './components/ReceiveAmountForm';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <nav className="bg-zinc-800 p-4 text-white flex gap-4 justify-center">
        <a href="/send" className="hover:underline">Send</a>
        <a href="/receive" className="hover:underline">Receive</a>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/send" />} />
        <Route path="/send" element={<SendAmountForm />} />
        <Route path="/receive" element={<ReceiveAmountForm />} />
      </Routes>
    </div>
  );
}

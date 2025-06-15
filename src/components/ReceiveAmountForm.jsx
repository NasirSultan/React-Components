// components/ReceiveAmountForm.jsx
import React, { useState } from 'react';
import CalculatorModal from './CalculatorModal';

const ReceiveAmountForm = () => {
  const [amount, setAmount] = useState('');

  const handleReceive = () => {
    alert(`Receiving Amount: ${amount}`);
    // Call backend API here
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Receive Amount</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="w-full px-4 py-2 rounded bg-zinc-800 text-white mb-4"
      />
      <button
        onClick={handleReceive}
        className="w-full bg-green-600 text-white px-4 py-2 rounded"
      >
        Receive
      </button>

      {/* Calculator Modal */}
      <CalculatorModal onResult={(res) => setAmount(res)} />
    </div>
  );
};

export default ReceiveAmountForm;

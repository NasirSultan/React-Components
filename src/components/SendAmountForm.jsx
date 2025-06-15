
import React, { useState } from 'react';
import CalculatorModal from './CalculatorModal';

const SendAmountForm = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    alert(`Sending Amount: ${amount}`);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Send Amount</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="w-full px-4 py-2 rounded bg-zinc-800 text-white mb-4"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
      <CalculatorModal onResult={(res) => setAmount(res)} />
    </div>
  );
};

export default SendAmountForm;

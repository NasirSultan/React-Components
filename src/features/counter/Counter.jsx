// src/features/counter/Counter.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h2 className="text-3xl font-semibold mb-6">Counter: {count}</h2>
      <div className="space-x-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded"
        >
          +1
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded"
        >
          -1
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount,reset } from './features/counter/counterSlice';

export default function Counter() {
  const [count, setCount] = React.useState('');
  const counts = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Redux Counter</h1>
        
        <div className="flex flex-col gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>

          <span className="text-xl text-center font-medium text-gray-700">{counts}</span>

          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>

          <input
            type="number"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            placeholder="Enter amount"
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => dispatch(incrementByAmount(count))}
          >
            Increment by Amount
          </button>

          <p className="text-sm text-gray-500 text-center">Entered Value: {count}</p>
        
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => dispatch(reset())}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

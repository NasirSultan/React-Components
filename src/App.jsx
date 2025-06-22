// src/App.js
import React, { useState } from 'react';
import useFetch from './hooks/useFetch';
import MyForm from './MyForm';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');



  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Toggle View (useFetch + useInput)</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? 'Show Product List' : 'Show Input Form'}
      </button>

      {showForm ? (
       <MyForm />
      ) : (
        <div>
          {loading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {products && (
            <ul className="bg-white p-4 rounded shadow space-y-2">
              {products.map((product) => (
                <li key={product.id} className="border-b py-2">
                  <span className="font-semibold">{product.title}</span> – ${product.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

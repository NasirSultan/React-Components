// src/App.js
import React from 'react';
import useFetch from './hooks/useFetch';

export default function App() {
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Product List (useFetch)</h1>

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
  );
}

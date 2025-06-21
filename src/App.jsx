import React from 'react';
import helmetPkg from 'react-helmet-async';
const { Helmet } = helmetPkg;

export default function App() {
  return (
    <>
      <Helmet>
        <title>SSR with Helmet</title>
        <meta name="description" content="SSR React App with Helmet Async and Vite" />
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
        <h1 className="text-4xl font-bold">Hello from SSR React + Vite!</h1>
        <p className="mt-4 text-lg">Helmet and Tailwind are working ✅</p>
      </div>
    </>
  );
}

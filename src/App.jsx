// src/App.jsx
import React, { Suspense, lazy, useState } from 'react';
import { Helmet } from 'react-helmet';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4">
      {/* SEO Metadata */}
      <Helmet>
        <title>React Lazy Loading Demo | Improve Performance</title>
        <meta name="description" content="A demo showing how to use React.lazy and Suspense to improve load performance for heavy components." />
        <meta name="keywords" content="React, Lazy Loading, Suspense, Performance, SEO" />
        <meta name="author" content="Your Name or Brand" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <html lang="en" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">React Lazy Loading Demo</h1>

      <button
        onClick={() => setShow((prev) => !prev)}
        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        aria-expanded={show}
        aria-controls="heavy-component"
      >
        {show ? 'Hide' : 'Show'} Heavy Component
      </button>

      <div id="heavy-component" className="w-full">
        {show && (
          <Suspense fallback={<div className="text-gray-500">⏳ Loading Component...</div>}>
            <HeavyComponent />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;

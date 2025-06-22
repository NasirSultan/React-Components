import React, { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="App">
      <h1>Welcome to My App</h1>
      <p>This is a simple React application.</p>

      <button onClick={() => setLoading(!loading)}>toggle loading</button>
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="content">
          <p>Content is loaded!</p>
        </div>
      )}
      {
        loading && (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )
      }
    </div>
  );
}
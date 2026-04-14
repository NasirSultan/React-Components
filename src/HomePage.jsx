import React from "react";

function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to My Website</h1>
      <p>This is the home page built with React.js</p>
      <button onClick={() => alert("Hello!")}>Click Me</button>
    </div>
  );
}

export default HomePage;
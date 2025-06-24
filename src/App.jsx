import React from "react";
import BuggyComponent from "./components/BuggyComponent";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div>
      <h1>React Error Boundary Demo</h1>
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </div>
  );
}

export default App;

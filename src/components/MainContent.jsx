import React, { useState } from "react";
import BuggyComponent from "./BuggyComponent";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorBoundary";

const MainContent = () => {
  const [showBuggy, setShowBuggy] = useState(false);

  return (
    <div>
      <button onClick={() => setShowBuggy(true)}>Trigger Error</button>

      {showBuggy && (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setShowBuggy(false)}
        >
          <BuggyComponent />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default MainContent;

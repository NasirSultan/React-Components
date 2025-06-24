import React from "react";

const BuggyComponent = () => {
  throw new Error("Oops! Something went wrong inside BuggyComponent.");
  // return <div>You will not see this text.</div>;
};

export default BuggyComponent;

import React from "react";

const BuggyComponent = () => {
  throw new Error("Oops! This component crashed.");
};

export default BuggyComponent;

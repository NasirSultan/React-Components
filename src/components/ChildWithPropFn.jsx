import React from 'react';

const ChildWithPropFn = ({ renderFn }) => {
  const dynamicText = "This content comes from the child component.";
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-semibold">Child Component</h3>
      {renderFn(dynamicText)}
    </div>
  );
};

export default ChildWithPropFn;

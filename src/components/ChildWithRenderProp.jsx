import React from 'react';

const ChildWithRenderProp = ({ children }) => {

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-semibold">Child Component</h3>
      {children()}
    </div>
  );
};

export default ChildWithRenderProp;

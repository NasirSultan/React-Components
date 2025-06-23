import React from 'react';
import ChildWithPropFn from './ChildWithPropFn';

const ParentWithPropFn = () => {
  const renderContent = (text) => (
    <div className="p-4 bg-green-100 rounded">
      <h2 className="text-lg font-bold">Dynamic Block</h2>
      <p>{text}</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Parent with Function Prop</h1>
      <ChildWithPropFn renderFn={renderContent} />
    </div>
  );
};

export default ParentWithPropFn;

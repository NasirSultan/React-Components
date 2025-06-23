import React from 'react';
import ChildWithRenderProp from './ChildWithRenderProp';

const ParentWithRenderProp = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Parent with Render Prop</h1>
      <ChildWithRenderProp>
        {() => (
          <div className="p-4 bg-blue-100 rounded">
            <h2 className="text-lg font-bold">Render Prop Block</h2>
            <p>This data is from child using render props.</p>
          </div>
        )}
      </ChildWithRenderProp>
    </div>
  );
};

export default ParentWithRenderProp;

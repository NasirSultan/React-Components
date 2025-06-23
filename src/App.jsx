import React from 'react';
import ParentWithPropFn from './components/ParentWithPropFn';
import ParentWithRenderProp from './components/ParentWithRenderProp';
import { SharedBehaviorDemo } from './components/SharedBehaviorDemo';

export default function App() {
  return (
    <div className="p-6 space-y-8">
      <ParentWithPropFn />
      <hr />
      <ParentWithRenderProp />
      <hr />
      <SharedBehaviorDemo />
    </div>
  );
}

import React, { useState } from 'react';

const Hoverable = ({ children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-4 border rounded"
    >
      {children(hovered)}
    </div>
  );
};

// Two components using the same Hoverable behavior
export const SharedBehaviorDemo = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Shared Behavior with Render Prop</h1>

      <Hoverable>
        {(hovered) => (
          <div className={`transition ${hovered ? 'bg-yellow-200' : 'bg-white'}`}>
            <p>{hovered ? 'Hovering!' : 'Hover over me!'}</p>
          </div>
        )}
      </Hoverable>

      <Hoverable>
        {(hovered) => (
          <button
            className={`px-4 py-2 rounded transition font-semibold ${
              hovered ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            {hovered ? 'Release me' : 'Hover me'}
          </button>
        )}
      </Hoverable>
    </div>
  );
};

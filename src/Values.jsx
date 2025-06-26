
import React from 'react';

function Values({ name, number }) {
  return (
    <div>
      <h2>Submitted Data:</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Number:</strong> {number}</p>
    </div>
  );
}

export default Values;

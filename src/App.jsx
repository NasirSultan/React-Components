import React, { useState } from 'react';
import UserForm from './Button';
import Values from './Values';

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>User Form</h1>
      <UserForm onSubmit={handleFormSubmit} />
      
      {submittedData && (
        <div style={{ marginTop: '20px' }}>
          <Values name={submittedData.name} number={submittedData.number} />
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import UserForm from './Button';
import Values from './Values';

function App() {
  const [userData, setUserData] = useState({ name: '', number: '' });

  const handleFormSubmit = (formValues) => {
    setUserData(formValues); // Form data received from child
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Form</h1>

      <UserForm onSubmit={handleFormSubmit} />

      <div style={{ marginTop: '20px' }}>
        <Values name={userData.name} number={userData.number} />
      </div>
    </div>
  );
}

export default App;
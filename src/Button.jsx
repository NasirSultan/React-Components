
import React, { useState } from 'react';

function UserForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({ name: '', number: '' });

  const handleSubmit = () => {
    onSubmit(formValues); 
    setFormValues({ name: '', number: '' }); 
  };

  return (
    <div>
      <div>
        <label>Name:</label><br />
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, [e.target.name]: e.target.value })
          }
        />
      </div>

      <div>
        <label>Number:</label><br />
        <input
          type="text"
          name="number"
          value={formValues.number}
          onChange={(e) =>
            setFormValues({ ...formValues, [e.target.name]: e.target.value })
          }
        />
      </div>

      {/* Submit button outside form logic */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default UserForm;

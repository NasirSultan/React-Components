// src/hooks/useForm.js
import { useState } from 'react';

function useForm(fields, submitUrl) {
  const [values, setValues] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.initialValue || '' }), {})
  );
  const [message, setMessage] = useState(null); // success or error message
  const [type, setType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setValues(
      fields.reduce((acc, field) => ({ ...acc, [field.name]: field.initialValue || '' }), {})
    );
  };

  const InputFields = () =>
    fields.map((field) => (
      <div key={field.name} className="space-y-1">
        <label htmlFor={field.name} className="block font-medium">
          {field.label}
        </label>
        <input
          id={field.name}
          name={field.name}
          type={field.type || 'text'}
          placeholder={field.placeholder || ''}
          value={values[field.name]}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
    ));

  const Alert = () =>
    message ? (
      <div
        className={`p-3 rounded text-sm ${
          type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}
      >
        {message}
      </div>
    ) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(submitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Submission failed');

      const result = await response.json();
      console.log('Response:', result);
      setType('success');
      setMessage('Form submitted successfully!');
      reset();
    } catch (error) {
      console.error('Error:', error);
      setType('error');
      setMessage('Failed to submit the form. Please try again.');
    }

    // Clear message after 4 seconds
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  return {
    InputFields,
    handleSubmit,
    Alert,
  };
}

export default useForm;

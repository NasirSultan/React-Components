// src/components/MyForm.js
import React from 'react';
import useForm from './hooks/useInput';

const fields = [
  { name: 'name', label: 'Name', placeholder: 'Enter your name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
];

export default function MyForm() {
  const { InputFields, handleSubmit, Alert } = useForm(fields, 'https://jsonplaceholder.typicode.com/posts');

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">User Form</h2>

      <Alert />
      {InputFields()}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}

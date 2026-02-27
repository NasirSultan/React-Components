import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, ArrowRight } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+91859095488',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    alert('Form submitted successfully!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f6fc] p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Lets Get in <span className="text-blue-500">Touch</span>!
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Have a question or need assistance? Reach out to us via email, phone, or the contact form below. We're eager to assist you.
      </p>
      <div className="w-full max-w-lg">
        <form onSubmit={(e) => e.preventDefault()} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-2 gap-6 mb-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <select
              name="industry"
              className="w-full p-2 border border-gray-300 rounded bg-white"
            >
              <option>Health & Wellness</option>
              <option>Technology</option>
              <option>Finance</option>
            </select>
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full p-2 border border-gray-300 rounded h-28"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

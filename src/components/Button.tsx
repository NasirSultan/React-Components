import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}

      className={`px-4 py-2 rounded-md font-semibold m-5
                  text-white bg-blue-600 hover:bg-blue-700 
                  disabled:opacity-50 disabled:cursor-not-allowed transition`}
    >
      {label}
    </button>
  );
};

export default Button;

import React from 'react';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  className = '',
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full p-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;

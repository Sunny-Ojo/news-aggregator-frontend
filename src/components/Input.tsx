import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
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
  placeholder,
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
      {/* Label Rendering */}
      {label && !placeholder && (
        <label htmlFor={name} className="block text-sm font-semibold mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Field */}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder || ''}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full p-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;

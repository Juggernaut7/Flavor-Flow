import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, className = '', placeholder, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-text-dark text-sm sm:text-base font-bold mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded-xl w-full py-2 sm:py-3 px-3 sm:px-4 text-text-dark leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
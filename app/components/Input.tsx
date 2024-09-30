import React from "react";

interface InputProps {
  placeholder: string;
  value: string;
  setFunction: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, setFunction }) => {
  return (
    <input
      className="border-b-2 sm:mr-4 mb-8 sm:mb-0 focus:outline-none focus:border-blue-500 "
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setFunction(e.target.value)}
    />
  );
};

export default Input;

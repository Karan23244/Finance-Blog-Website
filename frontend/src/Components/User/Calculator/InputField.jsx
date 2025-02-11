import React from "react";

const InputField = ({ label, type, value, onChange, tooltip }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {tooltip && (
          <span
            className="ml-2 text-blue-500 cursor-pointer"
            data-tip={tooltip}>
            ℹ️
          </span>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default InputField;

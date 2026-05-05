import React, { useState, useEffect } from "react";

const SearchBar = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [localValue, onChange, value]);

  return (
    <div className="relative w-[280px]">
      <svg
        width={16}
        height={16}
        viewBox="0 0 20 20"
        fill="none"
        className="absolute left-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <circle cx="9" cy="9" r="6" stroke="#9ca3af" strokeWidth="1.8" />
        <path
          d="M15 15l-3.5-3.5"
          stroke="#9ca3af"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      
      <input
        type="text"
        placeholder="Search projects..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-[34px] pr-8 py-2 border border-gray-200 rounded-[8px] text-[13px] text-gray-700 bg-white outline-none transition-all duration-150 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />

      {localValue && (
        <button
          onClick={() => {
            setLocalValue("");
            onChange("");
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[#9ca3af] text-[18px] leading-none p-[2px] hover:text-gray-600"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchBar;
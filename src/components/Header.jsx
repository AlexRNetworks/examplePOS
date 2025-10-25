import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white shadow-md p-4">
      <h1 className="text-xl font-semibold text-gray-800">
        IT Administration Console
      </h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          User: **Jane Smith (IT Admin)**
        </span>
        <button 
          onClick={() => alert("Simulating System Logout...")}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

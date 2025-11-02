import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchByEmail = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Users by Email</h2>
      
      <div className="flex items-center bg-white rounded-md shadow-md overflow-hidden border border-gray-200 w-full">
        <input
          type="email"
          placeholder="Enter user email..."
          className="flex-1 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 flex items-center gap-2 transition-all">
          <FiSearch size={20} />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchByEmail;

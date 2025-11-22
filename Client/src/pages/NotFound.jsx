import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white">404</h1>
        <p className="text-xl mt-4 text-gray-600 dark:text-gray-300">
          Oops! Page not found.
        </p>
        <Link
          to="/admin"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

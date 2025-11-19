import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-xl text-gray-500">Page not found</p>
      <p className="mt-2 text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Home className="-ml-1 mr-2 h-5 w-5" />
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;

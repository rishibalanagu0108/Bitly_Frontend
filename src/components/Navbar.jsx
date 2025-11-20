import React from 'react';
import { Link } from 'react-router-dom';
import { Link2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Link2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BitlyClone</span>
            </Link>
          </div>
          <div className="flex items-center">
            <a
              href="https://github.com/rishibalanagu0108/Bitly_Frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

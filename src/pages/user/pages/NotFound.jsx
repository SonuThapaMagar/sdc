import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-9xl font-bold text-orange-500 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600">
            Oops! The page you're looking for seems to have wandered off like a curious puppy. 
            Let's help you find your way back home.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </button>
          </Link>
          
          <Link to="/pets">
            <button className="w-full bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center">
              <Search className="w-4 h-4 mr-2" />
              Browse Pets
            </button>
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>
            If you believe this is an error, please{' '}
            <Link to="/contact" className="text-orange-600 hover:text-orange-500">
              contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
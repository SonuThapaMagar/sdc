import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">FurEverHome</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/pets"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/pets') ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Pet Listings
            </Link>
            <Link
              to="/faq"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/faq') ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-orange-600 text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-orange-600 bg-orange-50' : 'text-gray-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/pets"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/pets') ? 'text-orange-600 bg-orange-50' : 'text-gray-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pet Listings
              </Link>
              <Link
                to="/faq"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/faq') ? 'text-orange-600 bg-orange-50' : 'text-gray-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/contact') ? 'text-orange-600 bg-orange-50' : 'text-gray-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-2 border-t flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 bg-orange-500 text-white rounded-md text-sm font-medium text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
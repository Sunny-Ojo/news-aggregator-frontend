import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice.ts';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          News Aggregator
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-white">
                Home
              </Link>
              <Link to="/personalized-feed" className="text-white">
                News Feed
              </Link>
              <Link to="/profile" className="text-white">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 p-4">
          {isAuthenticated ? (
            <>
              <Link to="/personalized-feed" className="block text-white py-2">
                News Feed
              </Link>
              <Link to="/profile" className="block text-white py-2">
                {user?.name}
              </Link>
              <button
                onClick={handleLogout}
                className="block text-white bg-red-500 px-4 py-1 rounded-md mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-white py-2">
                Login
              </Link>
              <Link to="/register" className="block text-white py-2">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

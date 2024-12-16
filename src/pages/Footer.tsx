import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 p-4 mt-10">
      <div className="container mx-auto text-center text-white">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} News Aggregator.
        </p>

        <nav className="mt-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link to="#" className="hover:text-gray-200">
                About Us
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-200">
                Contact
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-200">
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

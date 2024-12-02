import { useState } from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/'); // default active link

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);  // Set the active link to the clicked one
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <Link to=""><h1 className="text-[24px] font-bold text-gray-900 sm:tracking-[5px]">HEALTHBRIDGE</h1></Link>

        {/* Menu for larger screens */}
        <nav className="hidden md:flex space-x-6 text-[20px] font-normal font-lexend">
          <Link
            to="/"
            className={`text-gray-600 hover:text-teal-500 ${activeLink === '/' ? 'text-teal-500' : ''}`}
            onClick={() => handleLinkClick('/')}
          >
            Home
          </Link>
          <Link
            to="/signup"
            className={`text-gray-600 hover:text-teal-500 ${activeLink === '/signup' ? 'text-teal-500' : ''}`}
            onClick={() => handleLinkClick('/signup')}
          >
            Service
          </Link>
          <Link
            to="/contactus"
            className={`text-gray-600 hover:text-teal-500 ${activeLink === '/contactus' ? 'text-teal-500' : ''}`}
            onClick={() => handleLinkClick('/contactus')}
          >
            Contact Us
          </Link>
          <Link
            to="/help"
            className={`text-gray-600 hover:text-teal-500 ${activeLink === '/help' ? 'text-teal-500' : ''}`}
            onClick={() => handleLinkClick('/help')}
          >
            Help
          </Link>
          <Link
            to="/blogs"
            className={`text-gray-600 hover:text-teal-500 ${activeLink === '/blogs' ? 'text-teal-500' : ''}`}
            onClick={() => handleLinkClick('/blogs')}
          >
            Blogs
          </Link>
        </nav>

        {/* Hamburger Icon for smaller screens */}
        <button
          className="block md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md z-10">
          <ul className="flex flex-col items-center space-y-4 py-4 text-[20px] font-normal font-lexend">
            <li>
              <Link
                to="/"
                className={`text-gray-600 hover:text-teal-500 ${activeLink === '/' ? 'text-teal-500' : ''}`}
                onClick={() => handleLinkClick('/')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className={`text-gray-600 hover:text-teal-500 ${activeLink === '/signup' ? 'text-teal-500' : ''}`}
                onClick={() => handleLinkClick('/signup')}
              >
                Service
              </Link>
            </li>
            <li>
              <Link
                to="/contactus"
                className={`text-gray-600 hover:text-teal-500 ${activeLink === '/contactus' ? 'text-teal-500' : ''}`}
                onClick={() => handleLinkClick('/contactus')}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className={`text-gray-600 hover:text-teal-500 ${activeLink === '/help' ? 'text-teal-500' : ''}`}
                onClick={() => handleLinkClick('/help')}
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className={`text-gray-600 hover:text-teal-500 ${activeLink === '/blogs' ? 'text-teal-500' : ''}`}
                onClick={() => handleLinkClick('/blogs')}
              >
                Blogs
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;

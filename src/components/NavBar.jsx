import  { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <a  href="#home"><h1 className="text-[24px] font-bold text-gray-900 tracking-[5px]">HEALTHBRIDGE</h1></a>
        

        {/* Menu for larger screens */}
        <nav className="hidden md:flex space-x-6 active:text-[#007E85] text-[20px] font-normal font-lexend">
          <a href="#home" className="text-gray-600 hover:text-teal-500 font-lexend">
            Home
          </a>
          <a href="#service" className="text-gray-600 hover:text-teal-500">
            Service
          </a>
          <a href="#contact" className="text-gray-600 hover:text-teal-500">
            Contact Us
          </a>
          <a href="#help" className="text-gray-600 hover:text-teal-500">
            Help
          </a>
          <a href="#blogs" className="text-gray-600 hover:text-teal-500">
            Blogs
          </a>
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
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center space-y-4 py-4 active:text-[#007E85] text-[20px] font-normal font-lexend">
            <li>
              <a href="#home" className="text-gray-600 hover:text-teal-500">
                Home
              </a>
            </li>
            <li>
              <a href="#service" className="text-gray-600 hover:text-teal-500">
                Service
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-600 hover:text-teal-500">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#help" className="text-gray-600 hover:text-teal-500">
                Help
              </a>
            </li>
            <li>
              <a href="#blogs" className="text-gray-600 hover:text-teal-500">
                Blogs
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;

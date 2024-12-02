// src/Sidebar.tsx


import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaComments, FaSignOutAlt } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa'; // Import the add user icon
import SideBarPic from '../assets/Sidebar-pic.png'

// , FaCode, FaChevronDown, FaChevronUp

// eslint-disable-next-line react/prop-types
const Sidebar = ({ onLogout }) => {
//   const [showLanguages, setShowLanguages] = useState(false); 
  // This state controls the dropdown for languages
  

  return (
    <div className="flex">
      <div
        className="fixed top-0 left-0 h-full bg-[#ffffff] text-white  pl-3 md:w-64 md:translate-x-0 w-16 gap-[10px]" // Adjusted width for mobile (w-48 for smaller sidebar)
      >
        <div className="flex justify-between items-center mb-4 pt-[8px]">
          {/* On mobile, show the icons without text */}
          <img src={SideBarPic} alt='Sidebar Pic'/>
        </div>

        <nav className="space-y-2 gap-[8px] max-md:mt-10">
          <Link to="/" className="flex items-center p-2 pr-[2px] hover:bg-[#123358] md:w-full rounded bg-[#123258] h-[38px] ">
            <FaTachometerAlt className="mr-2 text-2xl" /> {/* Adjusted icon size */}
            <span className="hidden md:inline text-[15px] font-normal">Dashboard</span>
          </Link>
          <Link to="/newpatient" className="flex items-center p-2 hover:bg-[#E6E6FA] rounded hover:bg-gray w-full h-[38px]">
            <FaUserPlus className="mr-2 text-2xl text-[#4B465C]" /> {/* Adjusted icon size */}
            <span className="hidden md:inline text-[15px] font-normal text-[#4B465C]">New Patients</span>
          </Link>
          
          <Link to="/yourpatients" className="flex items-center p-2 hover:bg-[#E6E6FA] rounded hover:bg-gray w-full h-[38px]">
          <FaUsers className="mr-2 text-2xl text-[#4B465C]" />
            <span className="hidden md:inline text-[15px] font-normal text-[#4B465C]">Your Patients</span>
          </Link>
          <Link to="/chat" className="flex items-center p-2 hover:bg-[#E6E6FA] rounded hover:bg-gray w-full h-[38px]">
            <FaComments className="mr-2 text-2xl text-[#4B465C]" /> {/* Adjusted icon size */}
            <span className="hidden md:inline text-[15px] font-normal text-[#4B465C]">Chat</span>
          </Link>
          

          {/* Languages Dropdown */}
          {/* <div>
            <button
              className="w-full text-left flex items-center p-2 hover:bg-gray-700 rounded hover:bg-gray w-full"
              onClick={() => setShowLanguages(!showLanguages)}
            >
              <FaCode className="mr-2 text-xl md:text-2xl" /> 
              <span className="hidden md:inline">Languages</span>
              {showLanguages ? <FaChevronUp className="ml-2 text-xl md:text-2xl" /> : <FaChevronDown className="ml-2 text-xl md:text-2xl" />} 
            </button>
            {showLanguages && (
              <div className="ml-4 space-y-2">
                <button className="block p-2 hover:bg-gray-600 rounded hover:bg-gray w-full">JavaScript</button>
                <button className="block p-2 hover:bg-gray-600 rounded hover:bg-gray w-full">Java</button>
                <button className="block p-2 hover:bg-gray-600 rounded hover:bg-gray w-full">TypeScript</button>
              </div>
            )}
          </div> */}

          <Link onClick={onLogout}  className="flex items-center p-2 hover:bg-[#E6E6FA] rounded hover:bg-gray w-full h-[38px]">
            <FaSignOutAlt className="mr-2 text-2xl text-[#4B465C]" /> {/* Adjusted icon size */}
            <span className="hidden md:inline text-[15px] font-normal text-[#4B465C]">Logout</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

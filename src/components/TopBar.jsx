// src/TopBar.tsx
import { FaBell } from 'react-icons/fa';
import { FaEllipsisH } from 'react-icons/fa'; // Import horizontal ellipsis
import ProfilePic from '../assets/profilePIC.png'

const TopBar = () => {
  return (
    <div className="fixed w-full flex items-center space-x-[16px] gap-[16px] justify-end bg-[#02053D] p-4 h-[72px] text-white shadow-lg  right md:ml-[240px] md:pr-[240px] max-md:ml-[60px] max-md:pr-[60px]">
      {/* Left Section - Bell Icon */}
      <div className="flex items-center ">
        <button className=" hover:bg-gray-800 w-[40px] h-[40px] pl-[9px] rounded-[8px] bg-[#21234E]">
          <FaBell className="text-xl md:text-2xl" />
        </button>
      </div>

      <hr className='w-[0.5px] h-[31px] bg-[#E5E7FB]'/>

      {/* Right Section - User Info */}
      <div className="flex items-center space-x-[16px] gap-[16px] pr-[25px]">
      <img
          src={ProfilePic}
          alt="User Avatar"
          className="w-[32px] h-[32px] rounded-full"
        />
        <div className="hidden sm:flex flex-col text-left ">
          <span className="font-semibold text-[14px] text-white">Georgia Griffin</span>
          <span className="text-sm text-[#F2F4F7] text-[12px] font-normal">georgia@gmail.com</span>
        </div>
        
        <button className="flex bg-[#21234E] pl-[9px] hover:bg-gray-800 w-[40px] h-[40px] items-center rounded-[8px]">
            <FaEllipsisH className="text-xl md:text-2xl text-[#E5E7FB]" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;

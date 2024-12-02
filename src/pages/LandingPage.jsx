// import React from 'react'
import HomePic from '../assets/home-pic.png'
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {

  const navigate = useNavigate();

  return (
    <div>
        <main className="flex flex-col-reverse lg:flex-row items-center max-md:px-10 px-20 h-screen w-full lg:full justify-center max-lg:min-h-[89vh]  xl:gap-[14px]  ">
        {/* Left Content */}
        <div className=" lg:mr-20 text-center lg:text-left w-1/2 max-lg:w-full max-lg:pt-10">
          <h2 className="text-[48px] font-extrabold text-[#123258] leading-snug max-sm:text-[30px] font-poppins">
            Simplify Patient <br /> Management With Ease
          </h2>
          <p className="text-[#000000B2] mt-4 text-[20px] font-normal max-md-px-10 ">
            Manage Your Patients, Monitor Their Progress, And Enhance Care All
            In One Platform.
          </p> 
          <div className="pt-10 lg:pt-32 flex justify-center lg:justify-start max-sm:flex-wrap gap-6 pb-5 ">
            <button onClick={() => navigate('/signup')} className="px-6 py-2 bg-[#007E85] text-white rounded-lg hover:bg-teal-600 w-[264px] sm:w-[264px] sm:h-[51px] font-medium text-[20px]">
              Create Account
            </button>
            <button onClick={() => navigate('/signin')} className="px-6 py-2 border border-[#123258] rounded-lg hover:bg-gray-100 sm:w-[149px] sm:h-[51px] font-medium text-[20px]">
              Login
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex w-1/2 max-sm:w-[70%]">
          <div className="flex items-center justify-center ">
          {/* bg-gradient-to-b from-teal-500 to-teal-300 */}
            <img
              src={HomePic}
              alt="Doctor"
              className=" w-auto"
            />
          </div>
         
         
        </div>
      </main>
    </div>
  )
}

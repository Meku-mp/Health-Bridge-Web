// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import SignINImage from '../assets/signIN-UP.png'
import Google from '../assets/googleIcon.png'
import Fb from '../assets/fbIcon.png'
import BackIcon from '../assets/BackIcon.png'
 // Update the path to your image
// import { auth } from "../firebase"; // Firebase setup file
// import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUpPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', specialist: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       alert("Account created successfully!");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

  return (
    <div className="flex h-screen">
      {/* Left Form Section */}
      <div className="flex flex-col items-center justify-center w-2/3 px-8 max-xl:w-1/2 md:px-20 max-md:w-full">
      <div className='flex justify-start w-full gap-[8px] items-center  h-[38px] '>
      
      <a href='#home'>
      <button className='flex items-center gap-[8px] h-[38px] w-[100px] hover:bg-gray-200 justify-center rounded-md '>
      <img src={BackIcon} alt='BackIcon' className='w-[12px] h-[18px]'/>
      <h5 className='text-[18px]'>Back</h5>
      </button>
      </a>
      
      </div>
      
        <h1 className="mb-[70px] text-[31.29px] font-bold text-[#123258]">HEALTHBRIDGE</h1>
        <h2 className="mb-1 text-[30px] font-semibold">Sign in to your account</h2>
        <h2 className="mb-10 text-[16px] font-normal text-[#667085]">Welcome back! Please enter your details.</h2>
      
        <form  className="w-full max-w-sm">
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#344054] text-[14px] font-medium">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-md text-[16px] font-normal"
              placeholder="Enter your e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-16">
            <label htmlFor="password" className="block text-[#344054] text-[14px] font-medium">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md text-[16px] font-normal"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <p className="mt-1 text-sm text-gray-500">Must be at least 8 characters.</p>
          </div>
          
          <button
            type="submit"
            className="w-full px-4 h-[44px] text-white transition bg-[#123258] rounded-md hover:bg-[#123359] font-medium text-[16px]"
          >
            Log in
          </button>
        </form>
        <div className="flex items-center justify-center mt-6 relative w-full max-w-[24rem]">
          <hr className="absolute top-1/2 w-full h-[1px] bg-[#EAECF0] border-0 " />
          <p className="relative px-4 text-[#475467] bg-white font-medium text-[14px]">OR</p>
        </div>


        
        <div className="flex mt-4 space-x-4 w-full items-center justify-center">
          <button className="flex items-center justify-center p-2 bg-gray-100 rounded-md max-w-[12rem] h-[3rem] w-[12rem]">
            <img src={Fb} className="object-contain w-[24px] h-[24px]" alt="Facebook " />
          </button>
          <button className="flex items-center justify-center p-2 bg-gray-100 rounded-md max-w-[12rem] h-[3rem] w-[12rem]">
            <img src={Google} className="object-contain w-[24px] h-[24px]" alt="Google" />
          </button>
        </div>

        <p className="mt-6 text-[#101828] text-[14px]">
          Don't have an account?{' '}
          <a href="/login" className="text-[#0E1680] hover:underline font-semibold text-[14px]">Create Account</a>
        </p>
      </div>
      {/* Right Image Section */}
      <div className="hidden w-1/3 md:flex h-screen justify-end max-xl:w-1/2">
        <img src={SignINImage} alt="Sign In" className="object-cover w-auto " />
      </div>
    </div>
  );
}

export default SignUpPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignINImage from "../assets/signIN-UP.png";
import Google from "../assets/googleIcon.png";
import Fb from "../assets/fbIcon.png";
import { auth } from "../utilities/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialist: "",
  });
  const [error, setError] = useState(""); // To show any error messages
  const [loading, setLoading] = useState(false); // To track loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const db = getFirestore(); // Get Firestore instance

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true); // Set loading to true while submitting

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // After user is created, store additional user data (name and specialist) in the "people" collection
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        specialist: formData.specialist,
        email: formData.email,
        createdAt: new Date(),
      });

      alert("Account created successfully!");
      navigate("/signin"); // Redirect to login page
    } catch (error) {
      setError(error.message); // Display Firebase error
    } finally {
      setLoading(false); // Set loading to false after submission
    }

  };

  return (
    <div className='flex h-screen'>
      {/* Left Form Section */}
      <div className='flex flex-col items-center justify-center w-2/3 px-8 max-xl:w-1/2 md:px-20 max-md:w-full'>
        <div className='flex justify-start w-full gap-[8px] items-center  h-[38px] '>
          {/* Back button can be added here */}
        </div>
        <h1 className='mb-[50px] text-[31.29px] font-bold text-[#123258]'>
          HEALTHBRIDGE
        </h1>
        <h2 className='mb-8 text-[30px] font-semibold'>Create an account</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}{" "}
        {/* Display error message */}
        <form onSubmit={handleSubmit} className='w-full max-w-sm'>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-[#344054] text-[14px] font-medium'
            >
              Name*
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='w-full p-2 border border-gray-300 rounded-md text-[16px] font-normal'
              placeholder='Enter your name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-[#344054] text-[14px] font-medium'
            >
              Email*
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full p-2 border border-gray-300 rounded-md text-[16px] font-normal'
              placeholder='Enter your e-mail'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-[#344054] text-[14px] font-medium'
            >
              Password*
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='w-full p-2 border border-gray-300 rounded-md text-[16px] font-normal'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <p className='mt-1 text-sm text-gray-500'>
              Must be at least 8 characters.
            </p>
          </div>
          <div className='mb-8'>
            <label
              htmlFor='specialist'
              className='block text-[#344054] text-[14px] font-medium'
            >
              Specialist
            </label>
            <input
              type='text'
              id='specialist'
              name='specialist'
              className='w-full p-2 border border-gray-300 rounded-md text-[16px] font-normal'
              placeholder='Enter your area'
              value={formData.specialist}
              onChange={handleChange}
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 h-[44px] text-white transition bg-[#123258] rounded-md hover:bg-[#123359] font-medium text-[16px]'
            disabled={loading} // Disable button while loading
          >
            {loading ? "Creating Account..." : "Get started"}{" "}
            {/* Show loading text */}
          </button>
        </form>
        {/* Social Login Options */}
        <div className='flex items-center justify-center mt-6 relative w-full max-w-[24rem]'>
          <hr className='absolute top-1/2 w-full h-[1px] bg-[#EAECF0] border-0 ' />
          <p className='relative px-4 text-[#475467] bg-white font-medium text-[14px]'>
            OR
          </p>
        </div>
        <div className='flex mt-4 space-x-4 w-full items-center justify-center'>
          <button className='flex items-center justify-center p-2 bg-gray-100 rounded-md max-w-[12rem] h-[3rem] w-[12rem]'>
            <img
              src={Fb}
              className='object-contain w-[24px] h-[24px]'
              alt='Facebook '
            />
          </button>
          <button className='flex items-center justify-center p-2 bg-gray-100 rounded-md max-w-[12rem] h-[3rem] w-[12rem]'>
            <img
              src={Google}
              className='object-contain w-[24px] h-[24px]'
              alt='Google'
            />
          </button>
        </div>
        <p className='mt-6 text-[#101828] text-[14px]'>
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className='text-[#0E1680] hover:text-[#090b22] font-semibold text-[14px]'
          >
            Log in
          </button>
        </p>
      </div>

      {/* Right Image Section */}
      <div className='hidden w-1/3 md:flex h-screen justify-end max-xl:w-1/2'>
        <img src={SignINImage} alt='Sign In' className='object-cover w-auto ' />
      </div>
    </div>
  );
}

export default SignUpPage;

// import React from 'react'
import { useState } from 'react';
import CardImage from '../assets/patient.png'
import Swal from 'sweetalert2';
import GraphButtonIcon from '../assets/graph-button-icons.png'
import GlucoseLevel from '../components/GlucoseLevel';
import InsulinTracking from '../components/InsulinTracking';
import Weight from '../components/Weight';
import Urination from '../components/Urination';
import Reports from '../components/Reports';
import SpecialNote from '../components/SpecialNote';

export default function MyPatient() {

  const [activeContent, setActiveContent] = useState('glucoseLevel'); // Track the active content

  const showContent = (content) => {
    setActiveContent(content); // Set the selected content as active
  };

   // Function to handle Accept button click
 const handleAccept = () => {
   Swal.fire({
     title: 'Are you sure?',
     text: 'You are about to accept this patient!',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, accept it!',
   }).then((result) => {
     if (result.isConfirmed) {
       Swal.fire('Accepted!', 'The patient has been accepted.', 'success');
     }
   });
 };




 return (
   <div className="flex h-full bg-[#F8F7FA] md:ml-[300px] ml-[90px] max-midxl:pr-[55px] max-md:pr-[32px] md:mt-[130px] mt-[100px] flex-col max-md:justify-center xl:w-[75vw] ">
     <div className="text-[#4B465C] text-[26px] font-extrabold pr-8 md:pb-[50px] pb-[40px] w-full">
       <span>My Patient</span>
     </div>
     <div className="flex max-w-full bg-white border border-[#DBDADE] rounded-[6px] shadow min-h-[120px] items-center justify-between max-sm:flex-col max-sm:items-center ">
       <div className='flex'>
           <div className='flex p-[20px] items-center max-xl:hidden'>
           <img src={CardImage} alt="New Patient" className="rounded-[4px] w-[80px] h-[80px] "/>
           </div>
           <div className='flex p-[20px] gap-[12px] flex-col justify-center'>
               <div className='flex'>
                   <span className='font-semibold text-[18px] text-[#101828]'>Nimal Bandara</span>
               </div>
               <div className='flex midxl:items-center xl:gap-[24px] max-xl:gap-[16px] justify-start max-xl:flex-col max-sm:items-center'>
                   <span className='font-medium text-[14px] text-[#475467]'>Age: 34</span>
                   <hr className='w-[1px] h-[14px] bg-[#4B465C] max-xl:hidden'/>
                   <span className='font-medium text-[14px] text-[#475467]'>Male</span>
                   <hr className='w-[1px] h-[14px] bg-[#4B465C] max-xl:hidden'/>
                   <span className='font-medium text-[14px] text-[#475467]'>077 6534783</span>
                   <hr className='w-[1px] h-[14px] bg-[#4B465C] max-xl:hidden'/>
                   <span className='font-medium text-[14px] text-[#475467]'>Jun 24, 2024</span>
               </div>
           </div>
       </div>
       <div className='flex gap-[8px] max-lg:flex-col max-sm:mt-3 p-[20px] '>
           <button onClick={handleAccept} className="text-[16px] font-semibold  text-[#123258]  bg-[#18DF80] rounded-[8px] hover:bg-[#2fbc78] w-[102px] h-[48px]">Call</button>
           <button className="text-[16px] font-semibold  text-[#344054]  bg-[#FFFFFF] rounded-[8px] hover:bg-[#8b8b8b] w-[102px] h-[48px] border-[1px]">Message</button>
       </div>
     </div>
     <div className='flex mt-[50px] mb-[50px] flex-wrap max-lg:justify-center'>
      
        <button onClick={() => showContent('glucoseLevel')} className='flex items-center justify-center w-[170px] h-[38px] rounded-[6px] gap-[8px] hover:bg-[#123258] hover:text-white active:bg-[#123258] active:text-[#FFFFFF]'>
          <img src={GraphButtonIcon} alt='Graph-Button-Icon' className='w-[18px] h-[18px]'/>
          <span className='text-[15px] text-[#A1A1AA] font-medium '>Glucose Level</span>
        </button>
      
      
        <button onClick={() => showContent('insulinTracking')} className='flex items-center justify-center w-[170px] h-[38px] rounded-[6px] gap-[8px] hover:bg-[#123258] hover:text-white active:bg-[#123258] active:text-[#FFFFFF]'>
          <img src={GraphButtonIcon} alt='Graph-Button-Icon' className='w-[18px] h-[18px]'/>
          <span className='text-[15px] text-[#A1A1AA] font-medium '>Insulin Tracking</span>
        </button>
      
      
        <button onClick={() => showContent('weight')} className='flex items-center justify-center w-[170px] h-[38px] rounded-[6px] gap-[8px] hover:bg-[#123258] hover:text-white active:bg-[#123258] active:text-[#FFFFFF]'>
          <img src={GraphButtonIcon} alt='Graph-Button-Icon' className='w-[18px] h-[18px]'/>
          <span className='text-[15px] text-[#A1A1AA] font-medium '>Weight</span>
        </button>
      
        <button onClick={() => showContent('urination')} className='flex items-center justify-center w-[170px] h-[38px] rounded-[6px] gap-[8px] hover:bg-[#123258] hover:text-white active:bg-[#123258] active:text-[#FFFFFF]'>
          <img src={GraphButtonIcon} alt='Graph-Button-Icon' className='w-[18px] h-[18px]'/>
          <span className='text-[15px] text-[#A1A1AA] font-medium '>Urination</span>
        </button>
      
        <button onClick={() => showContent('reports')} className='flex items-center justify-center w-[170px] h-[38px] rounded-[6px] gap-[8px] hover:bg-[#123258] hover:text-white active:bg-[#123258] active:text-[#FFFFFF]'>
          <img src={GraphButtonIcon} alt='Graph-Button-Icon' className='w-[18px] h-[18px]'/>
          <span className='text-[15px] text-[#A1A1AA] font-medium '>Reports</span>
        </button>
      
        <button  onClick={() => showContent('specialNote')} className='flex items-center justify-center w-[170px] h-[38px] rounded-[6px] gap-[8px] hover:bg-[#123258] hover:text-white active:bg-[#123258] active:text-[#FFFFFF]'>
          <img src={GraphButtonIcon} alt='Graph-Button-Icon' className='w-[18px] h-[18px]'/>
          <span className='text-[15px] text-[#A1A1AA] font-medium '>Special note</span>
        </button>
       
     </div>
     <div className="flex w-full bg-white p-[30px] rounded-[10px] shadow min-h-[400px] justify-center max-sm:flex-col max-sm:items-center mb-[30px] ">
        {activeContent === 'glucoseLevel' && <GlucoseLevel />}
        {activeContent === 'insulinTracking' && <InsulinTracking />}
        {activeContent === 'weight' && <Weight />}
        {activeContent === 'urination' && <Urination />}
        {activeContent === 'reports' && <Reports />}
        {activeContent === 'specialNote' && <SpecialNote />}
     </div>
   </div>
 )
}

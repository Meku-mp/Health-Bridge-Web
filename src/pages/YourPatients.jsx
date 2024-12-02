// import React from 'react'
import CardImage from '../assets/patient.png'
// import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function YourPatients() {

   // Function to handle Accept button click
   const navigate = useNavigate();




 return (
   <div className="flex md:ml-[300px] ml-[90px] max-midxl:pr-[55px] max-md:pr-[32px] md:mt-[130px] mt-[100px] flex-col max-md:justify-center xl:w-[75vw]">
   <div className="text-[#4B465C] text-[26px] font-extrabold pr-8 md:pb-[50px] pb-[40px] w-full">
       <span>Your Patients</span>
     </div>
     <div className="flex max-w-full bg-white border border-[#DBDADE] rounded-[6px] shadow min-h-[120px] items-center justify-between max-sm:flex-col max-sm:items-center ">
       <div className='flex'>
           <div className='flex p-[20px] items-center max-lg:hidden'>
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
               <div className='flex midxl:w-[70%] disabled  opacity-0 cursor-default'>
                    <span className='font-normal text-[12px] text-[#667085] max-sm:text-center'>blood sugar levels have been fluctuatingblood sugar levels have been fluctuating</span>
                </div>
           </div>
       </div>
       <div className='flex gap-[8px] max-lg:flex-col max-sm:mt-3 p-[20px]'>
           <button onClick={() => navigate('/mypatients')} className="text-[16px] font-semibold  text-white  bg-[#123258] rounded-[8px] hover:bg-[#0d1e33] w-[137px] h-[48px]">View Patient</button>
       </div>
     </div>
   </div>
 )
}

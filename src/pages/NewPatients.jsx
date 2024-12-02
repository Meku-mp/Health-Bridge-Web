// import React from 'react'
 import CardImage from '../assets/patient.png'
 import Swal from 'sweetalert2';


export default function NewPatients() {

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

  // Function to handle Remove button click
  const handleRemove = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to remove this patient!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Removed!', 'The patient has been removed.', 'success');
      }
    });
  };


  return (
    <div className="flex md:ml-[300px] ml-[90px] max-midxl:pr-[55px] max-md:pr-[32px] md:mt-[130px] mt-[100px] flex-col max-md:justify-center midxl:w-[75vw]">
    <div className="text-[#4B465C] text-[26px] font-extrabold pr-8 md:pb-[50px] pb-[40px]">
        <span>New Patients</span>
      </div>
      <div className="flex max-w-full  p-[20px]  bg-white border border-[#DBDADE] rounded-[6px] shadow min-h-[144px] items-center justify-between max-sm:flex-col max-sm:items-center ">
        <div className='flex'>
            <div className='flex p-[20px] items-center max-midxl:hidden'>
            <img src={CardImage} alt="New Patient" className="rounded-[4px] w-[80px] h-[80px] "/>
            </div>
            <div className='flex p-[20px] gap-[12px] flex-col justify-center max-sm:items-center'>
                <div className='flex max-sm:items-center'>
                    <span className='font-semibold text-[18px] text-[#101828]'>Nimal Bandara</span>
                </div>
                <div className='flex midxl:items-center max-midxl:gap-[16px] gap-[24px] justify-start max-midxl:flex-col max-sm:items-center'>
                    <span className='font-medium text-[14px] text-[#475467]'>Age: 34</span>
                    <hr className='w-[1px] h-[14px] bg-[#4B465C] max-midxl:hidden'/>
                    <span className='font-medium text-[14px] text-[#475467]'>Male</span>
                    <hr className='w-[1px] h-[14px] bg-[#4B465C] max-midxl:hidden'/>
                    <span className='font-medium text-[14px] text-[#475467]'>077 6534783</span>
                    <hr className='w-[1px] h-[14px] bg-[#4B465C] max-midxl:hidden'/>
                    <span className='font-medium text-[14px] text-[#475467]'>Jun 24, 2024</span>
                    <hr className='w-[1px] h-[14px] bg-[#4B465C] max-midxl:hidden'/>
                    <button className='font-semibold text-[14px] text-[#254EDB] w-[102px] h-[24px] bg-[#517EF266] rounded-[4px]'>View Receipt</button>
                </div>
                <div className='flex midxl:w-[70%]'>
                    <span className='font-normal text-[12px] text-[#667085] max-sm:text-center'>blood sugar levels have been fluctuatingblood sugar levels have been fluctuating</span>
                </div>
            </div>
        </div>
        <div className='flex gap-[8px] max-lg:flex-col max-sm:mt-3'>
            <button onClick={handleAccept} className="text-[16px] font-semibold  text-white  bg-[#123258] rounded-[8px] hover:bg-[#0d1e33] w-[102px] h-[48px]">Accept</button>
            <button onClick={handleRemove} className="text-[16px] font-semibold  text-[#344054]  bg-[#FFFFFF] rounded-[8px] hover:bg-[#8b8b8b] w-[102px] h-[48px] border-[1px]">Remove</button>
        </div>
      </div>
    </div>
  )
}

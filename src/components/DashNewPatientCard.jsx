// eslint-disable-next-line no-unused-vars
import React from 'react';
// import cardImage from "../assets/newp.png";
 // Replace with the actual path to your image
 import CardImage from '../assets/Doctor talking to a patient in the office.png'

function DashNewPatientCard() {
  return (
    <div className="flex ">
      <div className="flex max-w-[454px] p-[24px] space-x-4 bg-white border border-[#DBDADE] rounded-[6px] shadow min-h-[197px]">
        <div className="flex flex-col ">
          <div>
            <h2 className="text-[18px] font-medium text-[#4B465C]">New Patient</h2>
            <p className="text-[15px] text-[#4B465C]">
              Accept a new patient to start tracking their health journey.
            </p>
          </div>
          <span className="text-[22px] font-medium text-[#123258] mt-[5px]">02</span>
          <div className="flex items-center mt-[4px]">
            
            <button className="text-[15px] font-medium  text-white  bg-[#123258] rounded-[6px] hover:bg-[#0d1e33] w-[76px] h-[38px]">
              View
            </button>
          </div>
        </div>
        <div className=''>
          <img src={CardImage} alt="New Patient" className=" w-[198px] h-[158px] "/>
        </div>
      </div>
    </div>
  );
}

export default DashNewPatientCard;
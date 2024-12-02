// import React from 'react'
import Xray from '../assets/xray.png'

export default function Reports() {
  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-[160px] h-[175px] p-[12px] ga-[9px] rounded-[10px] shadow-md bg-[#F9FAFB] border-[#EAECF0]">
        <span>X-Ray Report</span>
        <img src={Xray} alt='Xray' className='max-w-[136px] max-h-[129px]'/>
      </div>
    </div>
  )
}

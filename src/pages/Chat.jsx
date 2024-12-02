// import React from 'react'
import ChatWindow from "../components/ChatWindow"

export default function Chat() {
  return (
    <div className="flex md:ml-[300px] ml-[90px] max-midxl:pr-[55px] max-md:pr-[32px] md:mt-[130px] mt-[100px] flex-col max-md:justify-center midxl:w-[75vw]">
     <div className="text-[#4B465C] text-[26px] font-extrabold pr-8 md:pb-[30px] pb-[30px] w-full">
       <span>Chat</span>
     </div>
     <div className="flex  md:mt-[20px] w-full">
        
        <ChatWindow />
     </div>
      
    </div>
  )
}

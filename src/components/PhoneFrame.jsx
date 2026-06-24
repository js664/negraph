import React from 'react';

export default function PhoneFrame({ children, onHomeClick }) {
  return (
    <div className="iphone-body w-[370px] bg-[#111111] rounded-[52px] p-[16px] border-4 border-[#3a3a3a] flex flex-col items-center relative z-20 select-none">
      
      {/* Speaker Grille & Camera */}
      <div className="flex justify-center items-center space-x-3 mb-6 mt-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#1b2530] border border-[#2e2e2e]"></div>
        <div className="w-14 h-1.5 rounded-full bg-[#202020] border border-[#333]"></div>
      </div>

      {/* Screen container */}
      <div className="w-[332px] h-[580px] bg-[#151515] rounded-[6px] overflow-hidden flex flex-col relative border border-black shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
        {children}
      </div>

      {/* Physical Home Button */}
      <button 
        onClick={onHomeClick}
        className="iphone-home-btn w-[46px] h-[46px] rounded-full border-2 border-[#2b2b2b] bg-[#151515] flex items-center justify-center mt-3 cursor-pointer active:scale-95 transition-transform hover:brightness-110"
      >
        <div className="w-[14px] h-[14px] border-2 border-gray-600 rounded-md"></div>
      </button>

    </div>
  );
}

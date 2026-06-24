import React from 'react';

export default function StatusBar({ muted }) {
  return (
    <div className="h-5 bg-gradient-to-b from-[#333333] to-[#1a1a1a] flex justify-between items-center px-2 text-[10px] text-gray-300 font-bold select-none border-b border-[#0d0d0d] w-full">
      <div className="flex items-center space-x-1">
        {/* Signal strength dots */}
        <div className="flex items-end space-x-[1px] h-2">
          <div className="w-[3px] h-[3px] bg-[#22c55e] rounded-full"></div>
          <div className="w-[3px] h-[4px] bg-[#22c55e] rounded-full"></div>
          <div className="w-[3px] h-[5px] bg-[#22c55e] rounded-full"></div>
          <div className="w-[3px] h-[6px] bg-[#22c55e] rounded-full"></div>
          <div className="w-[3px] h-[7px] bg-[#22c55e] rounded-full"></div>
        </div>
        <span className="font-sans font-medium text-[9px] tracking-wide text-gray-400">Negraph 3G</span>
      </div>
      
      <span className="font-sans text-[10px] text-gray-200">3:31 PM</span>
      
      <div className="flex items-center space-x-1">
        {muted ? (
          <span className="text-[9px] text-red-500 font-semibold uppercase tracking-tighter">MUTED</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
        <span className="text-[9px] text-gray-400 ml-1">89%</span>
        <div className="w-5 h-2.5 border border-gray-400 rounded-sm p-[1px] flex items-center">
          <div className="w-[14px] h-[6px] bg-[#22c55e] rounded-xs"></div>
        </div>
      </div>
    </div>
  );
}

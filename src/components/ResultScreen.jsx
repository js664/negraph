import React from 'react';

export default function ResultScreen({ result }) {
  if (!result) return null;

  return (
    <div className="bg-[#111] border-2 border-[#333] rounded-lg p-3 font-mono shadow-inner text-green-400 w-full">
      <div className="flex justify-between items-center border-b border-[#333] pb-1.5 mb-1.5 text-[10px] text-gray-500 uppercase tracking-widest">
        <span>SYSTEM READOUT</span>
        <span className="text-[8px] px-1 bg-[#222] rounded">VER. 2.12</span>
      </div>
      <div className="text-[12px] space-y-1">
        <div className="flex justify-between">
          <span>SUBJECT:</span>
          <span className="font-bold text-white uppercase">{result.name}</span>
        </div>
        <div className="flex justify-between">
          <span>AGE SPECIFIED:</span>
          <span className="font-bold text-white">{result.age}</span>
        </div>
        <div className="flex justify-between">
          <span>NEGRAPH COEFFICIENT:</span>
          <span className="font-bold text-white">{result.tone}%</span>
        </div>
        <div className="flex justify-between items-center border-t border-[#333] pt-1.5 mt-1.5">
          <span>STATUS:</span>
          <span className={`font-bold px-2 py-0.5 rounded text-[13px] tracking-wide ${
            result.category === 'GRANTED' ? 'bg-green-950 text-green-400 border border-green-500/50' : 
            result.category === 'RESTRICTED' ? 'bg-amber-950 text-amber-400 border border-amber-500/50' :
            'bg-red-950 text-red-400 border border-red-500/50'
          }`}>
            {result.statusText}
          </span>
        </div>
      </div>
    </div>
  );
}

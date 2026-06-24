import React from 'react';

export default function InputForm({ name, setName, age, setAge, tone, onSliderChange, diagnosticActive }) {
  // Continuous skin tone spectrum gradient background
  const skinGradientStyle = {
    background: 'linear-gradient(to right, #fbf1e6 0%, #f3d3b4 25%, #e1b382 50%, #c68a4c 75%, #8c5827 90%, #3d2314 100%)'
  };

  return (
    <div className="ios-group-container rounded-xl overflow-hidden w-full">
      {/* Name Input */}
      <div className="ios-cell flex items-center px-3 py-2.5">
        <label className="text-[11px] font-bold text-gray-500 w-24 tracking-wide uppercase select-none">Name</label>
        <input 
          type="text" 
          placeholder="e.g. Keegan-Michael" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={diagnosticActive}
          className="flex-1 bg-white border border-[#ccc] rounded px-2 py-1 text-[13px] font-medium outline-none focus:border-blue-500 shadow-inner disabled:opacity-70"
        />
      </div>

      {/* Age Input */}
      <div className="ios-cell flex items-center px-3 py-2.5">
        <label className="text-[11px] font-bold text-gray-500 w-24 tracking-wide uppercase select-none">Age</label>
        <input 
          type="text" 
          placeholder="e.g. 41" 
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={diagnosticActive}
          className="flex-1 bg-white border border-[#ccc] rounded px-2 py-1 text-[13px] font-medium outline-none focus:border-blue-500 shadow-inner disabled:opacity-70"
        />
      </div>

      {/* Skin Tone Slider */}
      <div className="ios-cell flex flex-col px-3 py-3 space-y-2">
        <div className="flex justify-between items-center select-none">
          <label className="text-[11px] font-bold text-gray-500 tracking-wide uppercase">Skin Tone Index</label>
          <span className="text-[11px] font-semibold text-gray-600 bg-gray-200/80 px-2 py-0.5 rounded-full">{tone}%</span>
        </div>
        
        <div className="relative w-full h-8 flex items-center">
          {/* Tone gradient strip */}
          <div 
            style={skinGradientStyle} 
            className="absolute inset-x-0 h-4 rounded-full border border-gray-400/80 shadow-inner"
          />
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={tone}
            onChange={onSliderChange}
            disabled={diagnosticActive}
            className="ios-slider relative z-10 w-full h-full bg-transparent appearance-none outline-none cursor-pointer disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function InputForm({ name, setName, ageGroup, setAgeGroup, tone, onSliderChange, diagnosticActive }) {
  // Continuous skin tone spectrum
  const skinGradientStyle = {
    background: 'linear-gradient(to right, #fbf1e6 0%, #f3d3b4 25%, #e1b382 50%, #c68a4c 75%, #8c5827 90%, #3d2314 100%)'
  };

  const ageOptions = [
    { id: 'child', label: '👶 Child' },
    { id: 'adult', label: '🧔 Adult' },
    { id: 'elder', label: '👴 Elder' }
  ];

  return (
    <div className="ios-group-container rounded-xl overflow-hidden shadow-xs w-full text-left select-none">
      
      {/* Name line - minimalist */}
      <div className="ios-cell flex items-center px-3 py-2">
        <label className="text-[10px] font-extrabold text-gray-500 w-16 uppercase tracking-wider">Subject</label>
        <input 
          type="text" 
          placeholder="Enter name..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={diagnosticActive}
          className="flex-1 bg-transparent text-[13px] font-bold text-gray-800 placeholder-gray-400 outline-none disabled:opacity-50"
        />
      </div>

      {/* Age Segmented Controls - extremely minimal and easy to tap */}
      <div className="ios-cell flex items-center px-3 py-2">
        <span className="text-[10px] font-extrabold text-gray-500 w-16 uppercase tracking-wider">Age Group</span>
        <div className="flex-1 flex border border-gray-300 rounded bg-gray-100 overflow-hidden text-[11px] font-bold">
          {ageOptions.map((opt) => {
            const isSelected = ageGroup === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAgeGroup(opt.id)}
                disabled={diagnosticActive}
                className={`flex-1 py-1 cursor-pointer transition-colors text-center ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-inner' 
                    : 'text-gray-600 hover:bg-gray-200'
                } disabled:opacity-50`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skin Tone Slider */}
      <div className="ios-cell flex flex-col px-3 py-2.5 space-y-1.5">
        <div className="flex justify-between items-center text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">
          <span>Skin Tone Index</span>
          <span className="text-gray-700 bg-gray-200 px-1.5 py-0.5 rounded-full font-mono">{tone}%</span>
        </div>
        <div className="relative w-full h-8 flex items-center">
          <div 
            style={skinGradientStyle} 
            className="absolute inset-x-0 h-3 rounded-full border border-gray-300 shadow-inner"
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

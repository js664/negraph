import React, { useState } from 'react';

export default function InputForm({ name, setName, ageGroup, setAgeGroup, tone, onSliderChange, diagnosticActive }) {
  const [coverUnlocked, setCoverUnlocked] = useState(false);

  // Continuous skin tone spectrum
  const skinGradientStyle = {
    background: 'linear-gradient(to right, #fbf1e6 0%, #f3d3b4 25%, #e1b382 50%, #c68a4c 75%, #8c5827 90%, #3d2314 100%)'
  };

  const ageOptions = [
    { id: 'child', label: '👶 Kid' },
    { id: 'adult', label: '🧔 Grown Ass' },
    { id: 'elder', label: '👴 Boomer' }
  ];

  return (
    <div className="ios-group-container rounded-xl overflow-hidden shadow-xs w-full text-left select-none relative">
      
      {/* Name line */}
      <div className="ios-cell flex items-center px-3 py-2">
        <label className="text-[10px] font-extrabold text-gray-500 w-16 uppercase tracking-wider">Target</label>
        <input 
          type="text" 
          placeholder="Name of this fool..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={diagnosticActive}
          className="flex-1 bg-transparent text-[13px] font-bold text-gray-800 placeholder-gray-400 outline-none disabled:opacity-50"
        />
      </div>

      {/* Age segment */}
      <div className="ios-cell flex items-center px-3 py-2">
        <span className="text-[10px] font-extrabold text-gray-500 w-16 uppercase tracking-wider">Maturity</span>
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

      {/* Overcomplicated Shielded Skin Tone Slider */}
      <div className="ios-cell flex flex-col px-3 py-3.5 space-y-1.5 relative min-h-[90px] justify-center">
        <div className="flex justify-between items-center text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">
          <span>Skin Tone Index</span>
          <span className="text-gray-700 bg-gray-200 px-1.5 py-0.5 rounded-full font-mono">{tone}%</span>
        </div>

        {/* The Slider Track and Thumb */}
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
            disabled={!coverUnlocked || diagnosticActive}
            className="ios-slider relative z-10 w-full h-full bg-transparent appearance-none outline-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          />

          {/* PHYSICAL SAFETY SHIELD COVER (Makes it overcomplicated/hard to use) */}
          {!coverUnlocked && (
            <div 
              onClick={() => setCoverUnlocked(true)}
              className="absolute inset-0 bg-gradient-to-b from-gray-200/90 to-gray-400/90 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer shadow-md hover:brightness-105 active:scale-98 transition-all z-20"
            >
              <span className="text-[9px] font-black text-gray-700 tracking-widest uppercase flex items-center space-x-1">
                <span>🔒 LATCHED: TAP TO FLIP SHIELD OPEN</span>
              </span>
            </div>
          )}

          {coverUnlocked && (
            <button 
              type="button"
              onClick={() => setCoverUnlocked(false)}
              className="absolute -top-3.5 right-0 text-[8px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200 hover:bg-red-100 z-20"
            >
              Close Shield 🔓
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

import React from 'react';

export default function InputForm({ name, setName, age, setAge, tone, onSliderChange, diagnosticActive, getSkinColor }) {
  // Continuous skin tone spectrum gradient background
  const skinGradientStyle = {
    background: 'linear-gradient(to right, #fbf1e6 0%, #f3d3b4 25%, #e1b382 50%, #c68a4c 75%, #8c5827 90%, #3d2314 100%)'
  };

  // Convert age to number for preview calculations
  const parsedAge = parseInt(age, 10) || 0;

  // Decide avatar features dynamically
  const skinColor = getSkinColor(tone);
  const isDenied = tone <= 35;
  const isGranted = tone >= 70;

  // Hair color based on age
  let hairColor = '#3a2010'; // Default brown
  if (parsedAge >= 60) {
    hairColor = '#d1d5db'; // Grey
  } else if (parsedAge > 0 && parsedAge < 25) {
    hairColor = '#1e1b4b'; // Young trendy dark indigo
  } else if (parsedAge >= 25 && parsedAge < 60) {
    hairColor = '#171717'; // Mature black
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      
      {/* LIVE BIOMETRIC HOLOGRAM PREVIEW */}
      <div className="relative bg-black/60 border border-[#444] rounded-xl p-3 flex flex-col items-center shadow-inner overflow-hidden select-none">
        
        {/* Hologram details */}
        <div className="absolute top-2 left-2 flex items-center space-x-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest">LIVE HUD PREVIEW</span>
        </div>

        <div className="absolute top-2 right-2 text-[8px] font-mono text-gray-500 uppercase">
          SCALE: Y = X
        </div>

        {/* Viewfinder brackets */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-cyan-500/50"></div>
        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-cyan-500/50"></div>
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-cyan-500/50"></div>
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-cyan-500/50"></div>

        {/* Animated grid lines behind avatar */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none h-1/2 animate-bounce"></div>

        {/* Dynamic Avatar Container */}
        <div className="relative w-28 h-28 my-3 flex items-center justify-center">
          
          {/* Avatar Base Face Circle */}
          <div 
            className="w-20 h-20 rounded-full border-2 border-white/95 shadow-xl relative transition-all duration-100 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: skinColor }}
          >
            {/* Forehead wrinkles (for old age) */}
            {parsedAge >= 50 && (
              <div className="absolute top-4 w-12 flex flex-col space-y-0.5 opacity-50 z-10">
                <div className="h-[1px] bg-black/35 w-full rounded"></div>
                <div className="h-[1px] bg-black/35 w-[80%] mx-auto rounded"></div>
              </div>
            )}

            {/* Cheek blush (for babies) */}
            {parsedAge > 0 && parsedAge <= 5 && (
              <div className="absolute inset-x-0 bottom-4 flex justify-between px-3.5 z-10">
                <div className="w-2.5 h-1.5 bg-red-400/50 rounded-full blur-xs"></div>
                <div className="w-2.5 h-1.5 bg-red-400/50 rounded-full blur-xs"></div>
              </div>
            )}

            {/* Beard (for middle age) */}
            {parsedAge >= 25 && parsedAge < 60 && (
              <div className="absolute bottom-0 w-16 h-7 bg-black/30 rounded-b-full flex justify-center">
                {/* Mustache notch */}
                <div className="w-4 h-2 bg-transparent border-b-2 border-black/30 rounded-full -mt-0.5"></div>
              </div>
            )}

            {/* SVG Face details */}
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-20">
              {/* EYES */}
              {isGranted ? (
                /* Cool sunglasses */
                <g fill="#111">
                  {/* Left lens */}
                  <rect x="22" y="38" width="22" height="15" rx="4" />
                  {/* Right lens */}
                  <rect x="56" y="38" width="22" height="15" rx="4" />
                  {/* Bridge */}
                  <rect x="42" y="42" width="16" height="4" />
                  {/* Glare reflect */}
                  <rect x="25" y="40" width="6" height="2" fill="#fff" opacity="0.6" />
                  <rect x="59" y="40" width="6" height="2" fill="#fff" opacity="0.6" />
                </g>
              ) : isDenied ? (
                /* Worried/scared eyes and brows */
                <g stroke="#222" strokeWidth="2.5" fill="none">
                  {/* Brows */}
                  <path d="M22 34 Q32 30 40 36" strokeWidth="2" />
                  <path d="M78 34 Q68 30 60 36" strokeWidth="2" />
                  {/* Eyeballs */}
                  <circle cx="31" cy="45" r="4.5" fill="#222" stroke="none" />
                  <circle cx="69" cy="45" r="4.5" fill="#222" stroke="none" />
                </g>
              ) : (
                /* Neutral plain eyes */
                <g fill="#222">
                  <circle cx="33" cy="45" r="3.5" />
                  <circle cx="67" cy="45" r="3.5" />
                </g>
              )}

              {/* MOUTH & NOSE */}
              <g stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round">
                {/* Nose */}
                <path d="M47 52 Q50 54 53 52" strokeWidth="2" />
                
                {/* Pacifier (for babies) */}
                {parsedAge > 0 && parsedAge <= 5 ? (
                  <g fill="#ef4444" stroke="#b91c1c" strokeWidth="1" transform="translate(38, 56)">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" fill="#fca5a5" />
                  </g>
                ) : isGranted ? (
                  /* Cool smirk/smile */
                  <path d="M30 60 Q50 78 70 60" />
                ) : isDenied ? (
                  /* Big frowny mouth */
                  <path d="M32 70 Q50 56 68 70" />
                ) : (
                  /* Flat neutral mouth */
                  <path d="M35 64 L65 64" />
                )}
              </g>
            </svg>
          </div>

          {/* DYNAMIC HAIR BLOCK (Overlaps face circle) */}
          {parsedAge > 5 && (
            <div 
              className="absolute top-1.5 w-22 h-8 rounded-t-full transition-all duration-100"
              style={{ 
                backgroundColor: hairColor,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {/* Young hair style extra spikes */}
              {parsedAge > 5 && parsedAge < 25 && (
                <div className="absolute -top-1 w-full flex justify-center space-x-1">
                  <div className="w-1.5 h-2 rounded-t-full transform -rotate-12" style={{ backgroundColor: hairColor }}></div>
                  <div className="w-1.5 h-2.5 rounded-t-full" style={{ backgroundColor: hairColor }}></div>
                  <div className="w-1.5 h-2 rounded-t-full transform rotate-12" style={{ backgroundColor: hairColor }}></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live details readout */}
        <span className="text-[12px] font-mono font-bold text-white tracking-wide truncate max-w-full uppercase">
          {name || "SUBJECT UNKNOWN"}
        </span>
        <span className="text-[9px] font-mono text-cyan-400/90 mt-0.5">
          AGE: {age || "N/A"} • STATUS: {isGranted ? "APPROVED ✅" : isDenied ? "DENIED ❌" : "RISKY ⚠️"}
        </span>
      </div>

      {/* INPUT FORM (iOS Grouped cells style) */}
      <div className="ios-group-container rounded-xl overflow-hidden shadow-xs">
        {/* Name input */}
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

    </div>
  );
}

import React from 'react';

export default function GraphArea({ tone, emoji, diagnosticActive, getSkinColor }) {
  // Diagonal positions for CSS absolute placement
  // Y = X mapping: left maps to tone%, bottom maps to tone%.
  const diagonalStyle = {
    left: `${tone}%`,
    bottom: `${tone}%`,
    transform: 'translate(-50%, 50%)',
    backgroundColor: getSkinColor(tone),
    boxShadow: `0 0 15px ${getSkinColor(tone)}a0, inset 0 2px 4px rgba(255,255,255,0.5), 0 4px 6px rgba(0,0,0,0.5)`,
    color: tone < 60 ? '#222' : '#fff'
  };

  return (
    <div className={`relative aspect-square w-full bg-[#1b1b1b] border-2 border-[#555] rounded-xl overflow-hidden shadow-inner flex flex-col justify-between p-3.5 ${diagnosticActive ? 'scanning' : ''}`}>
      <div className="lcd-grid absolute inset-0"></div>
      <div className="laser-scan-line"></div>
      
      {/* Top LCD Readouts */}
      <div className="relative z-10 flex justify-between items-start w-full select-none">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Diagnostic Mode</span>
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className={`h-2.5 w-2.5 rounded-full ${tone >= 70 ? 'led-green' : 'led-red'} border border-black/40`}></span>
            <span className="text-[10px] text-gray-400 font-mono tracking-widest">
              {diagnosticActive ? "SCANNING..." : `INDEX: ${tone}%`}
            </span>
          </div>
        </div>
        
        {/* Coordinates */}
        <div className="text-right flex flex-col font-mono text-[9px] text-[#4ade80] opacity-80">
          <span>X: {tone}.00</span>
          <span>Y: {tone}.00</span>
        </div>
      </div>

      {/* Main Graph Grid Canvas */}
      <div className="relative flex-1 w-full my-1.5 border border-dashed border-[#333] rounded-sm overflow-hidden bg-black/20">
        
        {/* Dotted Diagonal Path */}
        <div 
          className="absolute border-t-2 border-dashed border-red-600/60" 
          style={{
            width: '141.4%', /* diagonal length */
            transform: 'rotate(-45deg)',
            transformOrigin: 'bottom left',
            left: 0,
            bottom: 0
          }}
        />

        {/* Y-Axis Stamp Labels */}
        <div className="absolute top-2 left-2 flex flex-col select-none">
          <span className="text-[13px] font-extrabold text-green-500 bg-black/60 px-1.5 py-0.5 rounded border border-green-500/30 shadow-md tracking-wider">YES</span>
        </div>
        
        <div className="absolute bottom-2 left-2 flex flex-col select-none">
          <span className="text-[13px] font-extrabold text-red-500 bg-black/60 px-1.5 py-0.5 rounded border border-red-500/30 shadow-md tracking-wider">NO</span>
        </div>

        {/* The Face Indicator (Slides up/down diagonal) */}
        <div 
          className="absolute w-12 h-12 rounded-full flex items-center justify-center border-2 border-white transition-all duration-75 select-none"
          style={diagonalStyle}
        >
          <span className="text-2xl select-none leading-none mb-0.5">
            {emoji}
          </span>
        </div>
      </div>

      {/* Calibration footer labels */}
      <div className="relative z-10 flex justify-between text-[8px] text-gray-500 font-bold uppercase tracking-wider select-none">
        <span>Min Tone (0)</span>
        <span>Max Tone (100)</span>
      </div>
    </div>
  );
}

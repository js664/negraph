import React from 'react';

export default function AvatarView({ tone, emoji, ageGroup, diagnosticActive, diagnosticResult, getSkinColor }) {
  const skinColor = getSkinColor(tone);
  const isDenied = tone <= 35;
  const isGranted = tone >= 70;

  // Hair color based on age group
  let hairColor = '#3a2010'; // Default brown
  if (ageGroup === 'elder') {
    hairColor = '#d1d5db'; // Grey
  } else if (ageGroup === 'child') {
    hairColor = '#1e1b4b'; // Dark indigo
  } else if (ageGroup === 'adult') {
    hairColor = '#171717'; // Black
  }

  return (
    <div className="relative w-full bg-black/40 border border-[#333] rounded-2xl p-6 flex flex-col items-center justify-center shadow-inner overflow-hidden select-none min-h-[220px]">
      
      {/* HUD Scanner details */}
      <div className="absolute top-3 left-3 flex items-center space-x-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
        <span className="text-[8px] font-mono text-red-500 uppercase tracking-widest">ANALYZER HUD</span>
      </div>

      <div className="absolute top-3 right-3 text-[9px] font-mono text-gray-500 font-bold">
        COEFF: {tone}%
      </div>

      {/* Radar scanning grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Scanning laser line overlay */}
      {diagnosticActive && (
        <div className="absolute inset-x-0 h-0.5 bg-red-500/80 shadow-[0_0_8px_#ef4444] animate-bounce z-30" style={{ animationDuration: '1.2s' }}></div>
      )}

      {/* Primary Circular Hologram Target Bezel */}
      <div className={`relative rounded-full p-1.5 transition-all duration-300 ${
        diagnosticActive ? 'border-2 border-dashed border-red-500 animate-spin-slow' : 
        diagnosticResult ? (
          diagnosticResult.category === 'GRANTED' ? 'border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' :
          diagnosticResult.category === 'RESTRICTED' ? 'border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' :
          'border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)]'
        ) : 'border-2 border-gray-700/50'
      }`}>
        
        {/* Face circle container */}
        <div 
          className="w-24 h-24 rounded-full border-2 border-white/90 shadow-2xl relative transition-all duration-100 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: skinColor }}
        >
          {/* Forehead wrinkles (elder group) */}
          {ageGroup === 'elder' && (
            <div className="absolute top-5 w-14 flex flex-col space-y-0.5 opacity-40 z-10">
              <div className="h-[1px] bg-black/40 w-full rounded"></div>
              <div className="h-[1px] bg-black/40 w-[80%] mx-auto rounded"></div>
            </div>
          )}

          {/* Cheek blush (child group) */}
          {ageGroup === 'child' && (
            <div className="absolute inset-x-0 bottom-5 flex justify-between px-4.5 z-10">
              <div className="w-2.5 h-1.5 bg-red-400/40 rounded-full blur-xs"></div>
              <div className="w-2.5 h-1.5 bg-red-400/40 rounded-full blur-xs"></div>
            </div>
          )}

          {/* Beard (adult group) */}
          {ageGroup === 'adult' && (
            <div className="absolute bottom-0 w-18 h-7 bg-black/25 rounded-b-full flex justify-center">
              <div className="w-4 h-2 bg-transparent border-b-2 border-black/25 rounded-full -mt-0.5"></div>
            </div>
          )}

          {/* SVG details */}
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-20">
            {/* EYES */}
            {isGranted ? (
              /* Cool shades */
              <g fill="#111">
                <rect x="22" y="38" width="22" height="15" rx="4" />
                <rect x="56" y="38" width="22" height="15" rx="4" />
                <rect x="42" y="42" width="16" height="4" />
                <rect x="25" y="40" width="6" height="2" fill="#fff" opacity="0.6" />
                <rect x="59" y="40" width="6" height="2" fill="#fff" opacity="0.6" />
              </g>
            ) : isDenied ? (
              /* Worried eyes */
              <g stroke="#222" strokeWidth="2.5" fill="none">
                <path d="M22 34 Q32 30 40 36" strokeWidth="2" />
                <path d="M78 34 Q68 30 60 36" strokeWidth="2" />
                <circle cx="31" cy="45" r="4.5" fill="#222" stroke="none" />
                <circle cx="69" cy="45" r="4.5" fill="#222" stroke="none" />
              </g>
            ) : (
              /* Neutral eyes */
              <g fill="#222">
                <circle cx="33" cy="45" r="3.5" />
                <circle cx="67" cy="45" r="3.5" />
              </g>
            )}

            {/* MOUTH & NOSE */}
            <g stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round">
              <path d="M47 52 Q50 54 53 52" strokeWidth="2" />
              
              {ageGroup === 'child' ? (
                /* Pacifier for baby */
                <g fill="#ef4444" stroke="#b91c1c" strokeWidth="1" transform="translate(38, 56)">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" fill="#fca5a5" />
                </g>
              ) : isGranted ? (
                /* Big smile */
                <path d="M30 60 Q50 78 70 60" />
              ) : isDenied ? (
                /* Frowny curve */
                <path d="M32 70 Q50 56 68 70" />
              ) : (
                /* Flat curve */
                <path d="M35 64 L65 64" />
              )}
            </g>
          </svg>
        </div>

        {/* Dynamic hair blocks overlay */}
        {ageGroup !== 'child' && (
          <div 
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-6.5 rounded-t-full transition-all duration-100"
            style={{ 
              backgroundColor: hairColor,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          ></div>
        )}
      </div>

      {/* High impact direct readout text (Giant blunt label) */}
      {!diagnosticActive && diagnosticResult && (
        <div className={`mt-4 text-center select-none animate-fade-in`}>
          <span className={`text-[19px] font-extrabold tracking-widest block uppercase ${
            diagnosticResult.category === 'GRANTED' ? 'text-green-500' :
            diagnosticResult.category === 'RESTRICTED' ? 'text-amber-500' :
            'text-red-500'
          }`}>
            {diagnosticResult.statusText}
          </span>
          <span className="text-[10px] text-gray-300 font-semibold block mt-1 px-4 leading-relaxed">
            {diagnosticResult.descriptionText}
          </span>
        </div>
      )}

      {diagnosticActive && (
        <div className="mt-4 text-center select-none font-mono text-[12px] text-red-500 tracking-wider animate-pulse uppercase">
          🚨 COMPUTING GENES...
        </div>
      )}
    </div>
  );
}

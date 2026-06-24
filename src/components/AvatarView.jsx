import React from 'react';
import Avatar from 'react-nice-avatar';

export default function AvatarView({ tone, age, gender, emoji, diagnosticActive, diagnosticResult, getSkinColor }) {
  
  // Decide avatar config in real-time based on X (tone), Y (age), and Gender
  const getAvatarConfig = (t, a, g) => {
    // Mapping skin tone percentage to HEX color
    let faceColor = '#fbf1e6';
    if (t < 20) faceColor = '#fbf1e6';
    else if (t < 40) faceColor = '#f3d3b4';
    else if (t < 60) faceColor = '#e1b382';
    else if (t < 80) faceColor = '#c68a4c';
    else if (t < 95) faceColor = '#8c5827';
    else faceColor = '#3c200c';

    const isElder = a >= 60;
    const isChild = a < 15;

    // Hairstyle based on gender & age
    let hairStyle = 'normal';
    if (g === 'man') {
      if (isChild) hairStyle = 'mohawk';
      else if (isElder) hairStyle = 'thick'; // balding elder man
      else hairStyle = 'normal';
    } else {
      if (isChild) hairStyle = 'womanShort'; // young girl bob
      else if (isElder) hairStyle = 'womanShort'; // short elder lady hair
      else hairStyle = 'womanLong'; // long adult lady hair
    }

    // Hair color (grey for elders)
    let hairColor = '#3a2010'; // brown default
    if (isElder) {
      hairColor = '#e5e7eb'; // grey/white aging hair
    } else if (t >= 70) {
      hairColor = '#171717'; // black hair
    }

    const isGranted = t >= 70;
    const isDenied = t <= 35;

    let eyeStyle = 'circle';
    if (isGranted) eyeStyle = 'smile';
    else if (isDenied) eyeStyle = 'oval';

    let mouthStyle = 'peace';
    if (isGranted) mouthStyle = 'smile';
    else if (isDenied) mouthStyle = 'peace';

    let glassesStyle = 'none';
    if (isGranted) glassesStyle = 'round'; // Cool sunglasses

    let shirtStyle = 'hoody';
    if (isGranted) shirtStyle = 'short';
    if (isElder) shirtStyle = 'polo';

    return {
      sex: g,
      faceColor,
      hairStyle,
      hairColor,
      eyeStyle,
      mouthStyle,
      glassesStyle,
      shirtStyle,
      bgColor: '#151515',
      hatStyle: 'none',
      earSize: 'small',
      noseStyle: 'short',
      eyebrowStyle: 'up',
      shirtColor: isGranted ? '#10b981' : isDenied ? '#ef4444' : '#f59e0b'
    };
  };

  const avatarConfig = getAvatarConfig(tone, age, gender);

  return (
    <div className="relative w-full bg-black/45 border border-[#333] rounded-xl p-3 flex items-center space-x-3 shadow-inner overflow-hidden select-none min-h-[92px] h-[92px] flex-shrink-0">
      
      {/* Scanning laser line overlay */}
      {diagnosticActive && (
        <div className="absolute inset-y-0 h-0.5 bg-red-500/80 shadow-[0_0_8px_#ef4444] animate-bounce z-30" style={{ animationDuration: '1.2s' }}></div>
      )}

      {/* Nice Avatar Display */}
      <div className={`relative rounded-full p-0.5 transition-all duration-300 flex-shrink-0 ${
        diagnosticActive ? 'border-2 border-dashed border-red-500 animate-spin-slow' : 
        diagnosticResult ? (
          diagnosticResult.category === 'GRANTED' ? 'border-2 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' :
          diagnosticResult.category === 'RESTRICTED' ? 'border-2 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]' :
          'border-2 border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.4)]'
        ) : 'border border-gray-700/50'
      }`}>
        <Avatar 
          style={{ width: '56px', height: '56px' }} 
          className="rounded-full overflow-hidden" 
          {...avatarConfig} 
        />
      </div>

      {/* Diagnostics / Verdict output on the right */}
      <div className="flex-1 flex flex-col justify-center text-left min-w-0">
        {!diagnosticActive && diagnosticResult ? (
          <div className="animate-fade-in space-y-0.5">
            <span className={`text-[12.5px] font-black tracking-wider block leading-none ${
              diagnosticResult.category === 'GRANTED' ? 'text-green-400' :
              diagnosticResult.category === 'RESTRICTED' ? 'text-amber-400' :
              'text-red-400'
            }`}>
              {diagnosticResult.statusText}
            </span>
            <p className="text-[9px] text-gray-300 font-medium leading-tight max-h-[36px] overflow-y-auto">
              {diagnosticResult.descriptionText}
            </p>
          </div>
        ) : diagnosticActive ? (
          <div className="font-mono text-[10px] text-red-500 tracking-wider animate-pulse font-bold leading-none">
            🚨 COMPUTING GENES...
          </div>
        ) : (
          <div className="space-y-0.5">
            <span className="text-[8px] font-mono text-cyan-400 font-bold block uppercase tracking-wider leading-none">HUD STATUS: READY</span>
            <span className="text-[11px] font-bold text-white block leading-none">Click/Drag the 2D Graph below</span>
            <span className="text-[8.5px] text-gray-500 font-semibold block leading-none">
              Tone: {tone}% • Age: {age} • Gender: {gender === 'man' ? 'Male' : 'Female'}
            </span>
          </div>
        )}
      </div>

    </div>
  );
}

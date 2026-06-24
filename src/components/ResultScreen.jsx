import React from 'react';

export default function ResultScreen({ result }) {
  if (!result) return null;

  // Decide colors and texts dynamically based on the category
  let cardClass = '';
  let statusText = '';
  let descriptionText = '';

  if (result.category === 'GRANTED') {
    cardClass = 'bg-green-950/90 text-green-400 border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]';
    statusText = '✅ ALL CLEAR, HOMIE.';
    descriptionText = 'Pass fully authorized. Go ahead, say it loud and proud.';
  } else if (result.category === 'RESTRICTED') {
    cardClass = 'bg-amber-950/90 text-amber-400 border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
    statusText = '⚠️ EXT-RISK ZONE.';
    descriptionText = "You are pushing it. Unless you are rapping alone with locked car doors, don't try it.";
  } else {
    cardClass = 'bg-red-950/90 text-red-400 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
    statusText = '❌ HELL NO.';
    descriptionText = "White as snow. Don't say it. Don't hum it. Don't even think it.";
  }

  return (
    <div className={`rounded-xl p-4 font-mono w-full transition-all duration-300 ${cardClass}`}>
      <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2.5 text-[10px] uppercase tracking-widest opacity-80">
        <span>DIAGNOSTIC VERDICT</span>
        <span className="px-1.5 py-0.5 bg-black/40 rounded text-[9px]">SYSTEM FINAL REPORT</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="opacity-70">SUBJECT:</span>
          <span className="font-bold text-white uppercase">{result.name}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="opacity-70">SPECIFIED AGE:</span>
          <span className="font-bold text-white">{result.age} yrs</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="opacity-70">NEGRAPH DENSITY:</span>
          <span className="font-bold text-white">{result.tone}%</span>
        </div>
        
        <div className="border-t border-white/10 pt-2.5 mt-2.5 flex flex-col space-y-1">
          <div className="text-[15px] font-extrabold tracking-wider">{statusText}</div>
          <div className="text-[11px] text-gray-200 leading-relaxed font-sans">{descriptionText}</div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';

export default function NavBar({ muted, toggleMute, onReset }) {
  return (
    <div className="ios-navbar h-11 flex justify-between items-center px-3 relative w-full select-none">
      <div className="gloss-overlay absolute inset-0"></div>
      
      {/* Reset Button */}
      <button 
        onClick={onReset}
        className="relative z-10 ios-btn-gray text-white text-[11px] font-bold px-2.5 py-1 rounded-[4px] flex items-center space-x-1 hover:brightness-110 active:scale-95 transition-transform"
      >
        <RotateCcw className="h-3 w-3 mr-0.5" />
        <span>Reset</span>
      </button>

      {/* App Title */}
      <h1 
        className="text-white text-[18px] font-semibold tracking-wide italic text-center flex items-center justify-center select-none" 
        style={{ 
          textShadow: '0 -1px 0 rgba(0,0,0,0.8)', 
          fontFamily: "'Playfair Display', Georgia, serif" 
        }}
      >
        the negraph
      </h1>

      {/* Mute Button */}
      <button 
        onClick={toggleMute}
        className="relative z-10 ios-btn-gray text-white text-[11px] font-bold px-2 py-1 rounded-[4px] flex items-center hover:brightness-110 active:scale-95 transition-transform"
      >
        {muted ? (
          <VolumeX className="h-4.5 w-4.5 text-red-400" />
        ) : (
          <Volume2 className="h-4.5 w-4.5 text-gray-100" />
        )}
      </button>
    </div>
  );
}

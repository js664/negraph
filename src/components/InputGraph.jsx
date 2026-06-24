import React, { useRef, useEffect } from 'react';

export default function InputGraph({ tone, age, onUpdate, diagnosticActive }) {
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handlePointerDown = (e) => {
    if (diagnosticActive) return;
    isDragging.current = true;
    updateCoordinates(e);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || diagnosticActive) return;
    updateCoordinates(e);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updateCoordinates = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    let x = ((clientX - rect.left) / rect.width) * 100;
    let y = (1 - (clientY - rect.top) / rect.height) * 100;

    x = Math.max(0, Math.min(100, Math.round(x)));
    y = Math.max(1, Math.min(100, Math.round(y)));

    onUpdate(x, y);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-1.5 w-full select-none">
      
      {/* 2D Grid Canvas Panel */}
      <div 
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        className="relative h-[160px] w-full bg-[#181818] border border-[#3a3a3a] rounded-xl overflow-hidden shadow-inner cursor-crosshair select-none flex-shrink-0"
      >
        {/* LCD grid lines background */}
        <div className="lcd-grid absolute inset-0"></div>

        {/* Diagonal warning boundaries */}
        <div className="absolute top-2 left-2 text-[8px] font-mono text-green-500/30 uppercase">YES ZONE</div>
        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-red-500/30 uppercase">NO ZONE</div>

        {/* Diagonal line divider */}
        <div 
          className="absolute border-t border-dashed border-white/10" 
          style={{
            width: '141.4%',
            transform: 'rotate(-45deg)',
            transformOrigin: 'bottom left',
            left: 0,
            bottom: 0
          }}
        />

        {/* Horizontal axis grid markers */}
        <div className="absolute bottom-1 left-2 text-[8px] font-mono text-gray-600">Fair Skin</div>
        <div className="absolute bottom-1 right-2 text-[8px] font-mono text-gray-600 text-right">Dark Skin</div>
        
        {/* Vertical axis markers */}
        <div className="absolute top-2 left-2 text-[8px] font-mono text-gray-600">Elder (100)</div>
        <div className="absolute bottom-5 left-2 text-[8px] font-mono text-gray-600">Child (1)</div>

        {/* Grid coordinate overlay indicators */}
        <div className="absolute top-2 right-2 text-[8px] font-mono text-gray-400 bg-black/40 px-1 py-0.5 rounded border border-white/5">
          Tone: {tone}% • Age: {age}
        </div>

        {/* Target Reticle / Cursor dot */}
        <div 
          className="absolute w-6.5 h-6.5 rounded-full border-2 border-white bg-blue-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.8)] -translate-x-1/2 translate-y-1/2 transition-transform duration-75"
          style={{
            left: `${tone}%`,
            bottom: `${age}%`
          }}
        >
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>

      </div>

      {/* Axis Guide Titles */}
      <div className="flex justify-between items-center text-[9px] font-extrabold text-gray-500 uppercase tracking-wider px-1 select-none">
        <span>X: Skin Tone (Fair ➔ Dark)</span>
        <span>Y: Age (1 ➔ 100)</span>
      </div>

    </div>
  );
}

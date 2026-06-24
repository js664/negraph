import React from 'react';

export default function AboutTab() {
  return (
    <div className="space-y-3.5 bg-white border border-gray-300 rounded-xl p-4 text-gray-700 shadow-sm w-full">
      <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-200 pb-1.5 flex items-center select-none">
        <span className="mr-2">🔬</span> The Negraph Science
      </h2>
      
      <p className="text-xs leading-relaxed">
        <strong>The Negraph</strong> is a highly scientific, fictional calibration instrument designed to determine the precise threshold allowance coefficient for certain vernacular expressions.
      </p>
      
      <p className="text-xs leading-relaxed">
        First conceptualized in the legendary comedy sketch by <strong>Key & Peele</strong>, the Negraph utilizes state-of-the-art pixel analysis of skin reflectance index (SRI) on a linear diagonal axis mapping of <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded font-mono font-semibold">Y = X</code>.
      </p>

      <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[11px] italic text-gray-500 select-none">
        "It's not just a slider, it's a social contract mapped onto a cartesian coordinate system."
      </div>

      <div className="pt-2 text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest border-t border-gray-100 select-none">
        Parody Web App © 2026
      </div>
    </div>
  );
}

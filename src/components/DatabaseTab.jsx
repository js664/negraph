import React from 'react';

export default function DatabaseTab({ history, onClear, getSkinColor }) {
  return (
    <div className="space-y-3 w-full">
      <div className="flex justify-between items-center mb-1 select-none">
        <h2 className="text-xs font-extrabold text-gray-600 uppercase tracking-wide">NeGraph Database Records</h2>
        {history.length > 0 && (
          <button 
            onClick={onClear} 
            className="text-[10px] text-red-600 bg-red-100 hover:bg-red-200 border border-red-300 font-bold px-2 py-0.5 rounded cursor-pointer transition-colors active:scale-95"
          >
            Clear Database
          </button>
        )}
      </div>

      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {history.length === 0 ? (
          <div className="bg-white/60 border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-400 text-xs">
            No diagnostic entries in history.
          </div>
        ) : (
          history.map((record) => (
            <div key={record.id} className="bg-white border border-gray-300 rounded-lg p-2.5 flex items-center justify-between shadow-sm hover:border-gray-400 transition-colors">
              <div className="flex items-center space-x-2.5">
                {/* Miniature skin tone circle */}
                <div 
                  className="w-6.5 h-6.5 rounded-full border border-gray-300 shadow-sm flex items-center justify-center select-none"
                  style={{ backgroundColor: getSkinColor(record.index) }}
                >
                  <span className="text-xs leading-none">
                    {record.index <= 35 ? '🙁' : record.index >= 70 ? '🙂' : '😐'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-800 leading-tight">{record.name}</span>
                  <span className="text-[10px] text-gray-500 font-semibold">Age: {record.age} • Index: {record.index}%</span>
                </div>
              </div>
              
              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border select-none ${
                record.category === 'GRANTED' ? 'bg-green-100 border-green-300 text-green-700' :
                record.category === 'RESTRICTED' ? 'bg-amber-100 border-amber-300 text-amber-700' :
                'bg-red-100 border-red-300 text-red-700'
              }`}>
                {record.category}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { ShieldAlert, Database, Info } from 'lucide-react';

export default function TabBar({ activeTab, setActiveTab, playTick }) {
  const tabs = [
    { id: 'scanner', label: 'Scanner', icon: ShieldAlert },
    { id: 'history', label: 'Database', icon: Database },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <div className="relative h-14 w-full bg-gradient-to-b from-[#222222] to-[#0f0f0f] border-t border-black flex justify-around items-center px-1 select-none flex-shrink-0">
      <div className="gloss-overlay absolute inset-x-0 top-0 h-7 pointer-events-none"></div>
      
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button 
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              playTick(400, 0.05);
            }}
            className={`flex flex-col items-center justify-center w-20 h-full cursor-pointer transition-colors active:scale-95 ${
              isActive ? 'text-blue-400' : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            <IconComponent className="h-5 w-5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-1 tracking-wider uppercase">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

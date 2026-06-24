import React, { useState } from 'react';
import StatusBar from './components/StatusBar';
import NavBar from './components/NavBar';
import AvatarView from './components/AvatarView';
import InputGraph from './components/InputGraph';
import DatabaseTab from './components/DatabaseTab';
import AboutTab from './components/AboutTab';
import TabBar from './components/TabBar';
import PhoneFrame from './components/PhoneFrame';
import { sound } from './utils/audio';

export default function App() {
  const [tone, setTone] = useState(50);
  const [age, setAge] = useState(35); // Numeric age 1 to 100 set by Y coordinate
  const [name, setName] = useState('');
  const [diagnosticActive, setDiagnosticActive] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const [activeTab, setActiveTab] = useState('scanner');
  const [muted, setMuted] = useState(false);
  const [history, setHistory] = useState([
    { id: 1, name: 'Keegan-Michael Key', age: '41', tone: 78, category: 'GRANTED', index: 78 },
    { id: 2, name: 'Jordan Peele', age: '33', tone: 82, category: 'GRANTED', index: 82 },
    { id: 3, name: 'Zach Braff', age: '37', tone: 12, category: 'DENIED', index: 12 },
    { id: 4, name: 'Michael Scott', age: '45', tone: 5, category: 'DENIED', index: 5 },
    { id: 5, name: 'Slash', age: '47', tone: 71, category: 'GRANTED', index: 71 },
  ]);

  // Skin tone spectrum mapping
  const getSkinColor = (pct) => {
    if (pct < 20) return '#fbf1e6';
    if (pct < 40) return '#f3d3b4';
    if (pct < 60) return '#e1b382';
    if (pct < 80) return '#c68a4c';
    if (pct < 95) return '#8c5827';
    return '#3d2314';
  };

  // Toggle audio muting
  const toggleMute = () => {
    sound.muted = !muted;
    setMuted(!muted);
  };

  // 2D coordinates drag handler
  const handleGraphUpdate = (x, y) => {
    setTone(x);
    setAge(y);
    // Tick sound based on distance moves
    sound.playTick(150 + x * 5 + y * 2, 0.01);
  };

  // Comical verdict mappings
  let emoji = '😐';
  let statusText = '⚠️ RISK LEVEL CRITICAL. DO NOT SAY IT.';
  let descriptionText = "Look, shit is real risky. Unless you are rapping alone in your locked car, do NOT say it. You will get beat the fuck up.";
  let passCategory = 'RESTRICTED';

  if (tone <= 35) {
    emoji = '🙁';
    statusText = '❌ FUCK NO. WHITE AS SHIT.';
    descriptionText = "Are you out of your goddamn mind? You are white as printer paper. Do not say it, do not hum it, go back to Starbucks before you get clocked.";
    passCategory = 'DENIED';
  } else if (tone >= 70) {
    emoji = '😎';
    statusText = '✅ HELL YES. THE PASS IS YOURS.';
    descriptionText = "The pass is fully fucking authorized, homie. Say it loud, say it proud, you have 100% clearance.";
    passCategory = 'GRANTED';
  }

  // Reset form
  const handleReset = () => {
    setName('');
    setAge(35);
    setTone(50);
    setDiagnosticResult(null);
    setActiveTab('scanner');
    sound.playTick(300, 0.05);
  };

  // Home button press
  const handleHomeClick = () => {
    setActiveTab('scanner');
    sound.playTick(150, 0.08);
  };

  // Run scanning animation
  const runDiagnostic = () => {
    if (diagnosticActive) return;
    sound.playScanSweep();
    setDiagnosticActive(true);
    setDiagnosticResult(null);

    setTimeout(() => {
      setDiagnosticActive(false);
      setDiagnosticResult({
        name: name || 'ANONYMOUS FOOL',
        age: age,
        tone: tone,
        category: passCategory,
        statusText: statusText,
        descriptionText: descriptionText
      });

      // Play correct audio outcome
      if (passCategory === 'GRANTED') {
        sound.playSuccess();
      } else if (passCategory === 'RESTRICTED') {
        sound.playWarning();
      } else {
        sound.playFailure();
      }

      // Add to log list
      const newRecord = {
        id: Date.now(),
        name: name || 'Anonymous Fool',
        age: age,
        tone: tone,
        category: passCategory,
        index: tone
      };
      setHistory((prev) => [newRecord, ...prev]);
    }, 1800);
  };

  return (
    <div className="relative w-full max-w-sm flex flex-col items-center justify-center min-h-screen py-6 px-4">
      {/* Background radial highlight */}
      <div className="bg-overlay"></div>

      <PhoneFrame onHomeClick={handleHomeClick}>
        {/* iOS Top Status Bar */}
        <StatusBar muted={muted} />

        {/* Glossy Header Bar */}
        <NavBar 
          muted={muted} 
          toggleMute={toggleMute} 
          onReset={handleReset} 
        />

        {/* Scrollable Page Body - Scrollbar Hidden, Absolute Fit */}
        <div className="flex-grow ios-linen overflow-y-auto px-3.5 py-3 flex flex-col space-y-3 pb-20 select-none justify-between h-[480px]">
          {activeTab === 'scanner' && (
            <>
              {/* Target hologram name input at top */}
              <div className="flex items-center bg-black/45 border border-[#333] rounded-lg px-2.5 py-1.5 w-full select-none text-[12px] h-[34px]">
                <label className="text-[9px] font-mono text-gray-500 font-extrabold uppercase mr-2.5">Subject</label>
                <input 
                  type="text" 
                  placeholder="Name of target fool..." 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={diagnosticActive}
                  className="flex-1 bg-transparent border-none text-white text-[12px] font-bold outline-none placeholder-gray-600 disabled:opacity-50"
                />
              </div>

              {/* Avatar Biometric Panel (Now with react-nice-avatar) */}
              <AvatarView 
                tone={tone} 
                age={age}
                emoji={emoji} 
                diagnosticActive={diagnosticActive} 
                diagnosticResult={diagnosticResult}
                getSkinColor={getSkinColor} 
              />

              {/* 2D coordinates Graph Selector (Replaces sliders) */}
              <InputGraph 
                tone={tone}
                age={age}
                onUpdate={handleGraphUpdate}
                diagnosticActive={diagnosticActive}
              />

              {/* Minimal scan diagnostic trigger button */}
              <button 
                onClick={runDiagnostic}
                disabled={diagnosticActive}
                className={`w-full py-3 rounded-lg font-bold text-[15px] text-white select-none cursor-pointer hover:brightness-110 active:scale-98 transition-all h-[42px] flex items-center justify-center ${
                  diagnosticActive ? 'opacity-60 cursor-not-allowed' : ''
                } ${
                  passCategory === 'GRANTED' ? 'ios-btn-blue' : 
                  passCategory === 'RESTRICTED' ? 'ios-btn-gray' : 'ios-btn-red'
                }`}
              >
                {diagnosticActive ? "RUNNING GENETICS..." : "SCAN TARGET"}
              </button>
            </>
          )}

          {activeTab === 'history' && (
            <div className="h-[430px] overflow-hidden flex flex-col">
              <DatabaseTab 
                history={history} 
                onClear={() => setHistory([])} 
                getSkinColor={getSkinColor} 
              />
            </div>
          )}

          {activeTab === 'about' && (
            <div className="h-[430px] overflow-hidden flex flex-col justify-center">
              <AboutTab />
            </div>
          )}
        </div>

        {/* Glossy Footer Toolbar */}
        <TabBar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          playTick={(f, d) => sound.playTick(f, d)} 
        />
      </PhoneFrame>
    </div>
  );
}

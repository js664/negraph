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
  const [gender, setGender] = useState('man'); // 'man' or 'woman'
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
    sound.playTick(150 + x * 5 + y * 2, 0.01);
  };

  // Comical verdicts
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
    setGender('man');
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
        gender: gender,
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

        {/* content container - zero padding, flex layout, fit directly above tab bar */}
        <div className="flex-grow ios-linen p-3 flex flex-col justify-between select-none overflow-hidden h-[480px] min-h-[480px]">
          {activeTab === 'scanner' && (
            <div className="flex flex-col space-y-2.5 h-full justify-between">
              
              {/* Single row combining Name input (left) and Gender Selector (right) */}
              <div className="flex space-x-2 w-full h-[34px] items-center flex-shrink-0">
                
                {/* Name Input */}
                <div className="flex-1 flex items-center bg-black/45 border border-[#333] rounded-lg px-2.5 py-1.5 select-none text-[12px] h-full">
                  <label className="text-[9px] font-mono text-gray-500 font-extrabold uppercase mr-2.5">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Name..." 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={diagnosticActive}
                    className="flex-grow bg-transparent border-none text-white text-[12px] font-bold outline-none placeholder-gray-600 disabled:opacity-50 min-w-0"
                  />
                </div>

                {/* Gender toggle buttons */}
                <div className="flex border border-[#333] rounded-lg bg-black/45 overflow-hidden text-[9px] font-bold h-full flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setGender('man')}
                    disabled={diagnosticActive}
                    className={`px-2.5 flex items-center justify-center cursor-pointer transition-colors ${
                      gender === 'man' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    👨 Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('woman')}
                    disabled={diagnosticActive}
                    className={`px-2.5 flex items-center justify-center cursor-pointer transition-colors ${
                      gender === 'woman' ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    👩 Female
                  </button>
                </div>
              </div>

              {/* Avatar View (Now with react-nice-avatar and gender properties) */}
              <AvatarView 
                tone={tone} 
                age={age}
                gender={gender}
                emoji={emoji} 
                diagnosticActive={diagnosticActive} 
                diagnosticResult={diagnosticResult}
                getSkinColor={getSkinColor} 
              />

              {/* 2D Coordinates Input Selector */}
              <InputGraph 
                tone={tone}
                age={age}
                onUpdate={handleGraphUpdate}
                diagnosticActive={diagnosticActive}
              />

              {/* Minimal scan trigger button - fits perfectly on screen */}
              <button 
                onClick={runDiagnostic}
                disabled={diagnosticActive}
                className={`w-full rounded-lg font-bold text-[14px] text-white select-none cursor-pointer hover:brightness-110 active:scale-98 transition-all h-[38px] flex-shrink-0 flex items-center justify-center ${
                  diagnosticActive ? 'opacity-60 cursor-not-allowed' : ''
                } ${
                  passCategory === 'GRANTED' ? 'ios-btn-blue' : 
                  passCategory === 'RESTRICTED' ? 'ios-btn-gray' : 'ios-btn-red'
                }`}
              >
                {diagnosticActive ? "RUNNING GENETICS..." : "SCAN TARGET"}
              </button>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="h-full overflow-hidden flex flex-col justify-between">
              <DatabaseTab 
                history={history} 
                onClear={() => setHistory([])} 
                getSkinColor={getSkinColor} 
              />
            </div>
          )}

          {activeTab === 'about' && (
            <div className="h-full overflow-hidden flex flex-col justify-center">
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

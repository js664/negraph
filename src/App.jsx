import React, { useState } from 'react';
import StatusBar from './components/StatusBar';
import NavBar from './components/NavBar';
import GraphArea from './components/GraphArea';
import InputForm from './components/InputForm';
import ResultScreen from './components/ResultScreen';
import DatabaseTab from './components/DatabaseTab';
import AboutTab from './components/AboutTab';
import TabBar from './components/TabBar';
import PhoneFrame from './components/PhoneFrame';
import { sound } from './utils/audio';

export default function App() {
  const [tone, setTone] = useState(50);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
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

  // Continuous skin tone spectrum gradient background
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

  // Slide tick noises
  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setTone(val);
    sound.playTick(200 + val * 6, 0.012);
  };

  // Emoji calculations
  let emoji = '😐';
  let statusText = 'RESTRICTED';
  let passCategory = 'RESTRICTED';

  if (tone <= 35) {
    emoji = '🙁';
    statusText = 'HELL NO';
    passCategory = 'DENIED';
  } else if (tone >= 70) {
    emoji = '😎'; // Cool shades sunglasses emoji matching the sketch/smug feel
    statusText = 'ALLOWED';
    passCategory = 'GRANTED';
  }

  // Reset form
  const handleReset = () => {
    setName('');
    setAge('');
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

  // Run diagnostics scan sweep animation
  const runDiagnostic = () => {
    if (diagnosticActive) return;
    sound.playScanSweep();
    setDiagnosticActive(true);
    setDiagnosticResult(null);

    setTimeout(() => {
      setDiagnosticActive(false);
      setDiagnosticResult({
        name: name || 'SUBJECT UNKNOWN',
        age: age || '??',
        tone: tone,
        category: passCategory,
        statusText: statusText
      });

      // Play outcome sounds
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
        name: name || 'Subject Unknown',
        age: age || 'Unknown',
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

        {/* Scrollable Page Body */}
        <div className="flex-1 ios-linen overflow-y-auto px-3.5 py-3 flex flex-col space-y-3.5 pb-20 select-none">
          {activeTab === 'scanner' && (
            <>
              {/* Cartesian Coordinates Graph */}
              <GraphArea 
                tone={tone} 
                emoji={emoji} 
                diagnosticActive={diagnosticActive} 
                getSkinColor={getSkinColor} 
              />

              {/* LCD Readout Status Screen */}
              <ResultScreen result={diagnosticResult} />

              {/* iOS Styled Form Group with Live Avatar Preview */}
              <InputForm 
                name={name} 
                setName={setName} 
                age={age} 
                setAge={setAge} 
                tone={tone} 
                onSliderChange={handleSliderChange} 
                diagnosticActive={diagnosticActive}
                getSkinColor={getSkinColor}
              />

              {/* Giant Diagnostic Scan Button */}
              <button 
                onClick={runDiagnostic}
                disabled={diagnosticActive}
                className={`w-full py-3.5 rounded-xl font-bold text-[16px] text-white select-none cursor-pointer hover:brightness-110 active:scale-98 transition-all ${
                  diagnosticActive ? 'opacity-60 cursor-not-allowed' : ''
                } ${
                  passCategory === 'GRANTED' ? 'ios-btn-blue' : 
                  passCategory === 'RESTRICTED' ? 'ios-btn-gray' : 'ios-btn-red'
                }`}
              >
                {diagnosticActive ? "DIAGNOSING COEFICIENT..." : "RUN NEGRAPH DIAGNOSTIC"}
              </button>
            </>
          )}

          {activeTab === 'history' && (
            <DatabaseTab 
              history={history} 
              onClear={() => setHistory([])} 
              getSkinColor={getSkinColor} 
            />
          )}

          {activeTab === 'about' && (
            <AboutTab />
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

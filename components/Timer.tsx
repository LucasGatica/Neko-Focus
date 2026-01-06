import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Plus, Minus, Watch, Trophy, Folder, X } from 'lucide-react';
import { CatType } from '../types';
import { CAT_ASSETS } from '../constants';

interface TimerProps {
  onComplete: (duration: number, selectedCat: CatType, project: string) => void;
  unlockedCats: CatType[];
  projects: string[];
  activeProject: string;
  onProjectSelect: (name: string) => void;
  onAddProject: (name: string) => void;
}

const Timer: React.FC<TimerProps> = ({ onComplete, unlockedCats, projects, activeProject, onProjectSelect, onAddProject }) => {
  const [mode, setMode] = useState<'FOCUS' | 'SHORT' | 'LONG'>('FOCUS');
  const [isStopwatch, setIsStopwatch] = useState(false);
  
  const [focusBase, setFocusBase] = useState(25);
  const [shortBase, setShortBase] = useState(5);
  const [longBase, setLongBase] = useState(15);

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (isActive && isStopwatch) {
      const elapsedMinutes = Math.floor(secondsElapsed / 60);
      if (elapsedMinutes >= 5) {
        onComplete(elapsedMinutes, unlockedCats[selectedCatIndex], activeProject);
        setSecondsElapsed(0);
      }
    }
    setIsActive(!isActive);
  };

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setSecondsElapsed(0);
    if (mode === 'FOCUS') setTimeLeft(focusBase * 60);
    else if (mode === 'SHORT') setTimeLeft(shortBase * 60);
    else setTimeLeft(longBase * 60);
  }, [mode, focusBase, shortBase, longBase]);

  const changeMode = (newMode: 'FOCUS' | 'SHORT' | 'LONG') => {
    setMode(newMode);
    setIsStopwatch(false);
    setIsActive(false);
    setSecondsElapsed(0);
    const base = newMode === 'FOCUS' ? focusBase : newMode === 'SHORT' ? shortBase : longBase;
    setTimeLeft(base * 60);
  };

  const toggleStopwatchMode = () => {
    if (isActive) return;
    setIsStopwatch(!isStopwatch);
    setSecondsElapsed(0);
    setMode('FOCUS');
    if (!isStopwatch) setTimeLeft(0);
  };

  const adjustTime = (amount: number) => {
    if (isActive || isStopwatch) return;
    const adjust = (current: number) => Math.max(1, current + amount);
    if (mode === 'FOCUS') { setFocusBase(adjust(focusBase)); setTimeLeft(adjust(focusBase) * 60); }
    else if (mode === 'SHORT') { setShortBase(adjust(shortBase)); setTimeLeft(adjust(shortBase) * 60); }
    else { setLongBase(adjust(longBase)); setTimeLeft(adjust(longBase) * 60); }
  };

  const handleAddProjectSubmit = () => {
    if (newProjectName.trim()) {
      const name = newProjectName.trim();
      onAddProject(name);
      onProjectSelect(name);
      setNewProjectName('');
      setIsAddingProject(false);
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (isStopwatch) {
          setSecondsElapsed(prev => prev + 1);
        } else {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsActive(false);
              onComplete(focusBase, unlockedCats[selectedCatIndex], activeProject);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isStopwatch, focusBase, onComplete, unlockedCats, selectedCatIndex, activeProject]);

  const displayTime = isStopwatch ? secondsElapsed : timeLeft;
  const progressPercent = isStopwatch ? 0 : (timeLeft / (focusBase * 60)) * 100;

  return (
    <div className="flex flex-col items-center justify-evenly w-full h-full p-4 sm:p-8 animate-breathe">
      
      {/* Mode Selectors - Cozy Bubbles */}
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex bg-cozy-bg p-1.5 rounded-full shadow-inner border border-white">
          {(['FOCUS', 'SHORT', 'LONG'] as const).map((m) => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`px-4 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${
                mode === m && !isStopwatch
                  ? 'bg-white shadow-md text-cozy-brown' 
                  : 'text-gray-400 hover:text-cozy-brown/60'
              }`}
            >
              {m === 'FOCUS' ? 'Foco' : m === 'SHORT' ? 'Pausa' : 'Descanso'}
            </button>
          ))}
        </div>
        
        <button
          onClick={toggleStopwatchMode}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-2xl font-bold text-[10px] tracking-widest uppercase transition-all ${
            isStopwatch ? 'bg-cozy-secondary text-cozy-brown shadow-md' : 'bg-white text-gray-300 border border-gray-100'
          }`}
        >
          <Watch size={14} />
          {isStopwatch ? 'Modo Cronômetro' : 'Usar Cronômetro'}
        </button>
      </div>

      {/* Project Selector - Hidden when Active to reduce clutter, shown inside timer instead */}
      <div className={`relative z-20 flex flex-col items-center justify-center h-10 w-full max-w-xs transition-opacity ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
         {!isAddingProject ? (
            <div className="flex items-center gap-2">
                 <div className="relative group">
                    <select
                        value={activeProject}
                        onChange={(e) => onProjectSelect(e.target.value)}
                        className="appearance-none bg-white text-cozy-brown font-bold text-sm py-2 pl-4 pr-10 rounded-2xl shadow-sm border border-gray-100 focus:outline-none hover:shadow-md transition-shadow cursor-pointer min-w-[140px] text-center truncate"
                    >
                        {projects.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                    <Folder size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-cozy-primary pointer-events-none group-hover:text-cozy-brown transition-colors" />
                 </div>
                 <button 
                    onClick={() => setIsAddingProject(true)}
                    className="p-2 bg-white text-cozy-secondary rounded-xl shadow-sm hover:scale-105 transition-transform border border-gray-100"
                    title="Novo Projeto"
                 >
                    <Plus size={16} />
                 </button>
            </div>
         ) : (
            <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Nome do projeto..."
                    className="w-32 bg-white text-cozy-brown text-sm py-2 px-3 rounded-xl border border-cozy-secondary focus:outline-none shadow-inner"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleAddProjectSubmit()}
                />
                <button onClick={handleAddProjectSubmit} className="p-2 bg-cozy-secondary text-white rounded-lg hover:opacity-90 shadow-sm"><Plus size={16} /></button>
                <button onClick={() => setIsAddingProject(false)} className="p-2 text-gray-400 hover:text-gray-600"><X size={16} /></button>
            </div>
         )}
      </div>

      {/* Main Timer Display */}
      <div className="relative group shrink-0">
        {!isActive && !isStopwatch && (
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            <button onClick={() => adjustTime(5)} className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-cozy-brown hover:scale-110 active:scale-95 transition-all"><Plus size={20} /></button>
            <button onClick={() => adjustTime(-5)} className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-cozy-brown hover:scale-110 active:scale-95 transition-all"><Minus size={20} /></button>
          </div>
        )}

        <div className="w-64 h-64 sm:w-72 sm:h-72 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center relative overflow-hidden border-[8px] border-cozy-bg transition-all">
          {/* Progress Water Effect */}
          {!isStopwatch && (
            <div 
              className="absolute bottom-0 left-0 w-full bg-cozy-primary/20 transition-all duration-1000 ease-in-out"
              style={{ height: `${progressPercent}%`, borderRadius: '40% 40% 0 0' }}
            />
          )}

          <div className="z-10 flex flex-col items-center">
            <span className="text-6xl sm:text-7xl font-bold text-cozy-brown tracking-tight font-sans">
              {formatTime(displayTime)}
            </span>
            <div className="flex items-center gap-2 mt-2">
                {isActive && <Folder size={12} className="text-cozy-primary" />}
                <p className="text-xs text-cozy-brown/40 font-bold uppercase tracking-widest">
                    {isActive ? activeProject : (isStopwatch ? 'Tempo Decorrido' : 'Tempo Restante')}
                </p>
            </div>
          </div>

          {/* Cat Selection Interface */}
          <div className="absolute bottom-10 z-10 flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-full px-3 py-1 shadow-sm">
            <button onClick={() => setSelectedCatIndex(i => (i - 1 + unlockedCats.length) % unlockedCats.length)} className="text-cozy-brown/40 hover:text-cozy-brown transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="w-10 h-10 flex items-center justify-center animate-float">
               <img src={CAT_ASSETS[unlockedCats[selectedCatIndex]]} className="w-8 h-8 object-contain" />
            </div>
            <button onClick={() => setSelectedCatIndex(i => (i + 1) % unlockedCats.length)} className="text-cozy-brown/40 hover:text-cozy-brown transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={resetTimer}
          className="p-4 bg-white text-gray-300 rounded-full shadow-md hover:text-cozy-brown transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw size={24} />
        </button>

        <button
          onClick={toggleTimer}
          className={`w-20 h-20 flex items-center justify-center rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 ${
            isActive ? 'bg-white text-cozy-primary' : 'bg-cozy-primary text-white'
          }`}
        >
          {isActive ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
        </button>

        <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 flex items-center justify-center bg-cozy-accent rounded-full shadow-sm">
                <Trophy size={20} className="text-cozy-brown/50" />
            </div>
            <span className="text-[10px] font-bold text-cozy-brown/40 uppercase tracking-widest">
                {isStopwatch ? '>5 min' : '25 moedas'}
            </span>
        </div>
      </div>

      {isStopwatch && secondsElapsed < 300 && isActive && (
        <p className="text-[10px] font-bold text-cozy-primary uppercase tracking-widest animate-pulse bg-white/50 px-4 py-2 rounded-full">
          Faltam {formatTime(300 - secondsElapsed)} para o gatinho vir!
        </p>
      )}
    </div>
  );
};

export default Timer;
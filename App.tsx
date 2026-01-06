import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import CatEntity from './components/CatEntity';
import Shop from './components/Shop';
import Progress from './components/Progress';
import { UserState, Cat, CatType, Decoration, DecorationType, ShopItem, FocusRecord } from './types';
import { Coins, ShoppingBag, Home, Clock, MessageCircle, Paintbrush, BarChart2 } from 'lucide-react';
import { generateCatWisdom } from './services/geminiService';
import { CAT_ASSETS, ROOM_BACKGROUNDS, CAT_NAMES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'TIMER' | 'ROOM' | 'PROGRESS'>('TIMER');
  const [showShop, setShowShop] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('nekoFocusState');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.backgroundUrl || !parsed.backgroundUrl.startsWith('data:')) {
         parsed.backgroundUrl = ROOM_BACKGROUNDS[0];
      }
      if (!parsed.projects) parsed.projects = ['Trabalho', 'Estudos', 'Leitura'];
      if (!parsed.focusHistory) parsed.focusHistory = [];
      if (!parsed.activeProject && parsed.projects.length > 0) parsed.activeProject = parsed.projects[0];
      return parsed;
    }
    return {
      coins: 100,
      cats: [],
      decorations: [],
      unlockedCats: [CatType.STANDARD],
      backgroundUrl: ROOM_BACKGROUNDS[0],
      projects: ['Trabalho', 'Estudos', 'Leitura'],
      focusHistory: [],
      activeProject: 'Trabalho'
    };
  });

  useEffect(() => {
    localStorage.setItem('nekoFocusState', JSON.stringify(userState));
  }, [userState]);

  const handleTimerComplete = async (durationMinutes: number, selectedCat: CatType, project: string) => {
    setView('ROOM');
    const rewardCoins = 25;
    const catName = CAT_NAMES[Math.floor(Math.random() * CAT_NAMES.length)];
    const catImage = CAT_ASSETS[selectedCat];

    const newCat: Cat = {
      id: Date.now().toString(),
      type: selectedCat,
      name: catName,
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 60) + 20,
      animationDelay: Math.random() * 5,
      imageUrl: catImage
    };

    const newRecord: FocusRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      durationMinutes: durationMinutes,
      project: project,
      catEarned: selectedCat
    };

    setUserState(prev => ({
      ...prev,
      coins: prev.coins + rewardCoins,
      cats: [...prev.cats, newCat],
      focusHistory: [...prev.focusHistory, newRecord]
    }));

    const wisdom = await generateCatWisdom(durationMinutes);
    setModalMessage(`Novo amigo! ${catName} diz: "${wisdom}"`);
  };

  const handleAddProject = (name: string) => {
    if (!userState.projects.includes(name)) {
      setUserState(prev => ({
        ...prev,
        projects: [...prev.projects, name],
        activeProject: name
      }));
    }
  };

  const handleProjectSelect = (name: string) => {
    setUserState(prev => ({
      ...prev,
      activeProject: name
    }));
  };

  const handleBuy = (item: ShopItem) => {
    if (userState.coins < item.cost) return;
    setUserState(prev => {
      const newState = { ...prev, coins: prev.coins - item.cost };
      if (item.type === 'CAT') {
        newState.unlockedCats = [...prev.unlockedCats, item.detail as CatType];
      } else {
        const newDecor: Decoration = {
          id: Date.now().toString(),
          type: item.detail as DecorationType,
          x: Math.floor(Math.random() * 80) + 10,
          y: Math.floor(Math.random() * 50) + 30,
        };
        newState.decorations = [...prev.decorations, newDecor];
      }
      return newState;
    });
  };

  const handleCatClick = async (cat: Cat) => {
    const wisdom = await generateCatWisdom(5);
    setModalMessage(`${cat.name} ronrona: "${wisdom}"`);
  };

  const handleRenovateRoom = () => {
    if (userState.coins < 50) {
      setModalMessage("Você precisa de 50 moedas para renovar.");
      return;
    }
    let randomBg = ROOM_BACKGROUNDS[Math.floor(Math.random() * ROOM_BACKGROUNDS.length)];
    while (randomBg === userState.backgroundUrl && ROOM_BACKGROUNDS.length > 1) {
        randomBg = ROOM_BACKGROUNDS[Math.floor(Math.random() * ROOM_BACKGROUNDS.length)];
    }
    setUserState(prev => ({ ...prev, coins: prev.coins - 50, backgroundUrl: randomBg }));
  };

  return (
    <div className="min-h-screen bg-cozy-bg font-sans relative overflow-hidden flex flex-col text-cozy-text">
      
      {/* Top Bar - Cozy Soft */}
      <div className="z-20 px-8 py-6 flex justify-between items-center bg-transparent">
        <h1 className="text-2xl font-bold tracking-tight text-cozy-brown flex items-center gap-2">
          Neko<span className="text-cozy-primary font-black">Focus</span>
        </h1>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-sm text-cozy-brown font-bold border border-white">
            <Coins size={18} className="text-yellow-500 fill-yellow-500" />
            <span>{userState.coins}</span>
          </div>
          
          <button 
            onClick={() => setShowShop(true)}
            className="p-3 bg-cozy-primary text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative mx-6 mb-4 bg-white rounded-[3rem] shadow-xl overflow-hidden border border-white/50">
        
        {/* ROOM VIEW */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${view === 'ROOM' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
           <div 
             className="w-full h-full relative overflow-hidden bg-cover bg-center"
             style={{ backgroundImage: `url("${userState.backgroundUrl || ROOM_BACKGROUNDS[0]}")` }}
           >
              <button 
                onClick={handleRenovateRoom}
                className="absolute top-8 right-8 z-20 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-all text-cozy-brown"
              >
                <Paintbrush size={18} />
              </button>

              {userState.decorations.map(decor => (
                <div 
                  key={decor.id} 
                  className="absolute text-5xl drop-shadow-sm hover:scale-110 transition-transform cursor-pointer" 
                  style={{ left: `${decor.x}%`, top: `${decor.y}%` }}
                >
                  {decor.type === DecorationType.YARN ? '🧶' : decor.type === DecorationType.BOX ? '📦' : decor.type === DecorationType.PLANT ? '🪴' : '🧸'}
                </div>
              ))}

              {userState.cats.map(cat => (
                <CatEntity key={cat.id} cat={cat} onClick={handleCatClick} />
              ))}
              
              {userState.cats.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center p-10 bg-white/80 backdrop-blur-sm rounded-[3rem] shadow-sm">
                    <Home size={48} className="mx-auto mb-4 text-cozy-primary opacity-30" />
                    <h2 className="text-xl font-bold text-cozy-brown">Um novo lar esperando...</h2>
                    <p className="text-sm text-gray-400 mt-2">Complete um foco para convidar um gatinho!</p>
                  </div>
                </div>
              )}
           </div>
        </div>

        {/* TIMER VIEW */}
        <div className={`absolute inset-0 bg-white transition-transform duration-700 ease-out ${view === 'TIMER' ? 'translate-y-0 z-10' : 'translate-y-full z-0'}`}>
          <Timer 
            onComplete={handleTimerComplete} 
            unlockedCats={userState.unlockedCats} 
            projects={userState.projects}
            activeProject={userState.activeProject || userState.projects[0]}
            onProjectSelect={handleProjectSelect}
            onAddProject={handleAddProject}
          />
        </div>

        {/* PROGRESS VIEW */}
         <div className={`absolute inset-0 bg-white transition-transform duration-700 ease-out ${view === 'PROGRESS' ? 'translate-x-0 z-10' : 'translate-x-full z-0'}`}>
           <Progress userState={userState} />
         </div>
      </main>

      {/* Bottom Nav */}
      <div className="z-20 bg-transparent p-6 flex justify-center gap-10">
        <button 
          onClick={() => setView('TIMER')}
          className={`flex flex-col items-center gap-1 transition-all ${view === 'TIMER' ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
        >
          <div className={`p-4 rounded-3xl ${view === 'TIMER' ? 'bg-cozy-primary shadow-lg text-white' : 'bg-white text-cozy-brown'}`}>
             <Clock size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-cozy-brown">Foco</span>
        </button>

        <button 
          onClick={() => setView('PROGRESS')}
          className={`flex flex-col items-center gap-1 transition-all ${view === 'PROGRESS' ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
        >
          <div className={`p-4 rounded-3xl ${view === 'PROGRESS' ? 'bg-cozy-secondary shadow-lg text-white' : 'bg-white text-cozy-brown'}`}>
             <BarChart2 size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-cozy-brown">Stats</span>
        </button>

        <button 
          onClick={() => setView('ROOM')}
          className={`flex flex-col items-center gap-1 transition-all ${view === 'ROOM' ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
        >
          <div className={`p-4 rounded-3xl ${view === 'ROOM' ? 'bg-cozy-purple shadow-lg text-white' : 'bg-white text-cozy-brown'}`}>
             <Home size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-cozy-brown">Sala</span>
        </button>
      </div>

      {showShop && (
        <Shop coins={userState.coins} unlockedCats={userState.unlockedCats} onBuy={handleBuy} onClose={() => setShowShop(false)} />
      )}

      {modalMessage && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-cozy-brown/20 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl animate-float flex flex-col items-center text-center">
            <div className="bg-cozy-accent p-5 rounded-full mb-6">
              <MessageCircle size={40} className="text-cozy-brown" />
            </div>
            <p className="font-bold text-lg mb-8 text-cozy-brown leading-relaxed">
              {modalMessage}
            </p>
            <button 
              onClick={() => setModalMessage(null)}
              className="w-full bg-cozy-primary text-white rounded-2xl py-4 hover:opacity-90 transition-opacity font-bold shadow-lg"
            >
              Entendido!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
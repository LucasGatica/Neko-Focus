import React, { useState, useEffect } from 'react';
import { Cat, CatType } from '../types';
import { Cat as CatIcon, Zap, Ghost, Monitor } from 'lucide-react';

interface CatEntityProps {
  cat: Cat;
  onClick: (cat: Cat) => void;
}

const CatEntity: React.FC<CatEntityProps> = ({ cat, onClick }) => {
  // Local state for movement, initialized with the cat's saved position
  const [pos, setPos] = useState({ x: cat.x, y: cat.y });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    // Random movement logic
    const moveCat = () => {
      // Define boundaries (keep within 5% - 85% width, and 20% - 85% height for floor)
      const newX = Math.random() * 80 + 5;
      const newY = Math.random() * 65 + 20;

      // Determine direction to flip the sprite
      setIsFlipped(newX < pos.x);
      setIsMoving(true);
      setPos({ x: newX, y: newY });

      // Stop "moving" state after transition (approx 3s)
      setTimeout(() => setIsMoving(false), 3000);
    };

    // Initial random delay so all cats don't move at once
    const initialDelay = Math.random() * 2000;
    
    let intervalId: ReturnType<typeof setInterval>;

    const startWandering = () => {
      // Move every 4 to 8 seconds
      const frequency = Math.random() * 4000 + 4000;
      moveCat(); // Move once immediately after start
      intervalId = setInterval(moveCat, frequency);
    };

    const timeoutId = setTimeout(startWandering, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []); // Run once on mount

  const style: React.CSSProperties = {
    left: `${pos.x}%`,
    top: `${pos.y}%`,
    transition: 'top 3s ease-in-out, left 3s ease-in-out', // Smooth movement
    transform: `scaleX(${isFlipped ? -1 : 1})`, // Face direction
    zIndex: Math.floor(pos.y), // Higher Y (lower on screen) = Higher Z-index for perspective
  };

  const getCatColor = (type: CatType) => {
    switch (type) {
      case CatType.ORANGE: return 'text-orange-300';
      case CatType.VOID: return 'text-gray-700';
      case CatType.CALICO: return 'text-yellow-600';
      case CatType.ROBOT: return 'text-blue-300';
      default: return 'text-gray-400';
    }
  };

  const renderContent = () => {
    if (cat.imageUrl) {
      return (
        <img 
          src={cat.imageUrl} 
          alt={cat.name} 
          className={`w-24 h-24 object-contain hover:scale-110 transition-transform ${isMoving ? 'animate-wiggle' : 'animate-float'}`} 
        />
      );
    }

    // Fallback Icons
    let Icon = CatIcon;
    if (cat.type === CatType.ROBOT) Icon = Monitor;
    if (cat.type === CatType.VOID) Icon = Ghost;
    if (cat.type === CatType.ORANGE) Icon = Zap;

    return (
      <div className={`p-2 bg-white rounded-full shadow-sm ${getCatColor(cat.type)}`}>
        <Icon className="w-10 h-10" />
      </div>
    );
  };

  return (
    <div
      onClick={() => onClick(cat)}
      className="absolute cursor-pointer flex flex-col items-center"
      style={style}
    >
      {/* Name tag stays unflipped */}
      <div style={{ transform: `scaleX(${isFlipped ? -1 : 1})` }} className="absolute -top-6 transition-transform">
         <span className="bg-white/90 backdrop-blur-sm text-cozy-brown text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm border border-cozy-primary/20 whitespace-nowrap">
          {cat.name}
        </span>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default CatEntity;
import React from 'react';
import { ShopItem, CatType, DecorationType } from '../types';
import { ShoppingBag, Coins, X, Heart } from 'lucide-react';

interface ShopProps {
  coins: number;
  unlockedCats: CatType[];
  onBuy: (item: ShopItem) => void;
  onClose: () => void;
}

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'cat_orange', name: 'Gato Laranja', type: 'CAT', detail: CatType.ORANGE, cost: 100, icon: '🍊', description: 'Amante de lasanha.' },
  { id: 'cat_christmas', name: 'Gato Natalino', type: 'CAT', detail: CatType.CHRISTMAS, cost: 250, icon: '🎅', description: 'Ho ho ho! Miau!' },
  { id: 'cat_void', name: 'Gato Preto', type: 'CAT', detail: CatType.VOID, cost: 200, icon: '🌙', description: 'Sorte e mistério.' },
  { id: 'cat_calico', name: 'Calico', type: 'CAT', detail: CatType.CALICO, cost: 150, icon: '🎨', description: 'Uma pintura viva.' },
  { id: 'cat_business', name: 'Executivo', type: 'CAT', detail: CatType.BUSINESS, cost: 250, icon: '👔', description: 'Negócios sérios.' },
  { id: 'cat_party', name: 'Festeiro', type: 'CAT', detail: CatType.PARTY, cost: 300, icon: '🎈', description: 'Alegria pura.' },
  { id: 'cat_ninja', name: 'Ninja', type: 'CAT', detail: CatType.NINJA, cost: 400, icon: '🥷', description: 'Silencioso e letal.' },
  { id: 'cat_alien', name: 'Visitante', type: 'CAT', detail: CatType.ALIEN, cost: 450, icon: '👽', description: 'De outra galáxia.' },
  { id: 'cat_robot', name: 'Robo-Gato', type: 'CAT', detail: CatType.ROBOT, cost: 500, icon: '🤖', description: 'Beep boop.' },
  { id: 'cat_pig', name: 'Gato?', type: 'CAT', detail: CatType.PIG, cost: 1000, icon: '🐷', description: 'Algo de errado não está certo.' },
  { id: 'cat_turtle', name: 'Gato??', type: 'CAT', detail: CatType.TURTLE, cost: 1200, icon: '🐢', description: 'Devagar e sempre.' },
  { id: 'decor_yarn', name: 'Novelo', type: 'DECORATION', detail: DecorationType.YARN, cost: 50, icon: '🧶', description: 'Diversão macia.' },
  { id: 'decor_box', name: 'Caixa', type: 'DECORATION', detail: DecorationType.BOX, cost: 25, icon: '📦', description: 'O clássico.' },
];

const Shop: React.FC<ShopProps> = ({ coins, unlockedCats, onBuy, onClose }) => {
  return (
    <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-white">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-cozy-bg">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl shadow-sm">
                <ShoppingBag className="w-6 h-6 text-cozy-primary" />
            </div>
            <h2 className="text-2xl font-bold text-cozy-brown">Loja de Mimos</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors bg-white p-2 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Balance */}
        <div className="bg-white px-8 py-4 flex items-center justify-end gap-2 text-sm font-semibold text-cozy-text border-b border-gray-50">
          <span className="text-gray-400">Seu saldo:</span>
          <div className="flex items-center gap-1 bg-cozy-accent px-3 py-1 rounded-full text-cozy-brown">
             <Coins size={16} /> <span>{coins}</span>
          </div>
        </div>

        {/* Items Grid */}
        <div className="p-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/50">
          {SHOP_ITEMS.map((item) => {
            const isOwned = item.type === 'CAT' && unlockedCats.includes(item.detail as CatType);
            const canAfford = coins >= item.cost;

            return (
              <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-3xl bg-cozy-bg p-3 rounded-2xl">{item.icon}</span>
                  {isOwned && <Heart size={16} className="text-cozy-primary fill-cozy-primary" />}
                </div>
                
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-cozy-brown">{item.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                </div>
                
                {isOwned ? (
                  <button disabled className="w-full py-2 bg-gray-100 text-gray-400 rounded-xl font-semibold text-sm cursor-default">
                    Adquirido
                  </button>
                ) : (
                  <button
                    onClick={() => onBuy(item)}
                    disabled={!canAfford}
                    className={`
                      w-full py-2 rounded-xl font-bold text-sm transition-all
                      ${canAfford 
                        ? 'bg-cozy-secondary text-white hover:opacity-90 active:scale-95 shadow-sm hover:shadow-md' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                    `}
                  >
                    Adotar ({item.cost})
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
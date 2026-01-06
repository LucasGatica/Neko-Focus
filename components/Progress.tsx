import React, { useState, useMemo } from 'react';
import { FocusRecord, UserState, CatType } from '../types';
import { BarChart, Calendar, Award, PieChart as PieIcon } from 'lucide-react';
import { CAT_ASSETS } from '../constants';

interface ProgressProps {
  userState: UserState;
}

type TimeFrame = 'DAY' | 'MONTH' | 'YEAR';

const Progress: React.FC<ProgressProps> = ({ userState }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('DAY');

  // Filter history based on timeframe
  const filteredHistory = useMemo(() => {
    const now = new Date();
    return userState.focusHistory.filter(record => {
      const recordDate = new Date(record.date);
      
      if (timeFrame === 'DAY') {
        return recordDate.toDateString() === now.toDateString();
      }
      if (timeFrame === 'MONTH') {
        return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear();
      }
      if (timeFrame === 'YEAR') {
        return recordDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  }, [userState.focusHistory, timeFrame]);

  // Calculate totals
  const totalMinutes = useMemo(() => {
    return filteredHistory.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  }, [filteredHistory]);

  // Calculate Project Distribution
  const projectStats = useMemo(() => {
    const stats: Record<string, number> = {};
    filteredHistory.forEach(record => {
      stats[record.project] = (stats[record.project] || 0) + record.durationMinutes;
    });
    return Object.entries(stats)
      .map(([name, minutes]) => ({ name, minutes, percentage: (minutes / totalMinutes) * 100 }))
      .sort((a, b) => b.minutes - a.minutes);
  }, [filteredHistory, totalMinutes]);

  // Generate Conic Gradient for Pie Chart
  const pieChartGradient = useMemo(() => {
    if (projectStats.length === 0) return 'conic-gradient(#f3f4f6 0% 100%)';
    
    const colors = ['#FFB7B2', '#B5EAD7', '#E2F0CB', '#C7CEEA', '#FFDAC1', '#FF9AA2', '#E0BBE4', '#957DAD'];
    let gradientString = 'conic-gradient(';
    let currentPercentage = 0;

    projectStats.forEach((stat, index) => {
      const color = colors[index % colors.length];
      const start = currentPercentage;
      const end = currentPercentage + stat.percentage;
      gradientString += `${color} ${start}% ${end}%, `;
      currentPercentage = end;
    });

    return gradientString.slice(0, -2) + ')';
  }, [projectStats]);

  // Count Cats by Type (Global, not filtered by time)
  const catCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    userState.cats.forEach(cat => {
      counts[cat.type] = (counts[cat.type] || 0) + 1;
    });
    return counts;
  }, [userState.cats]);

  return (
    <div className="w-full h-full p-6 overflow-y-auto custom-scrollbar">
      <h2 className="text-2xl font-bold text-cozy-brown mb-6 flex items-center gap-2">
        <BarChart className="text-cozy-primary" />
        Seu Progresso
      </h2>

      {/* Timeframe Selector */}
      <div className="bg-cozy-bg p-1 rounded-xl inline-flex mb-8">
        {(['DAY', 'MONTH', 'YEAR'] as TimeFrame[]).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeFrame(tf)}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              timeFrame === tf 
                ? 'bg-white text-cozy-primary shadow-sm' 
                : 'text-gray-400 hover:text-cozy-text'
            }`}
          >
            {tf === 'DAY' ? 'Hoje' : tf === 'MONTH' ? 'Mês' : 'Ano'}
          </button>
        ))}
      </div>

      {/* Main Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Time Summary */}
        <div className="bg-cozy-bg/50 rounded-3xl p-6 flex flex-col justify-center items-center text-center border-2 border-white">
          <Calendar size={32} className="text-cozy-brown mb-2 opacity-50" />
          <span className="text-sm font-bold text-cozy-text uppercase tracking-widest opacity-60">Tempo de Foco</span>
          <div className="text-5xl font-bold text-cozy-brown my-2">
            {Math.floor(totalMinutes / 60)}<span className="text-lg text-gray-400">h</span> {totalMinutes % 60}<span className="text-lg text-gray-400">m</span>
          </div>
          <span className="text-xs font-medium bg-white px-3 py-1 rounded-full text-cozy-secondary shadow-sm">
            {filteredHistory.length} sessões
          </span>
        </div>

        {/* Project Distribution (Pie Chart) */}
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-100 flex flex-col items-center shadow-sm">
           <h3 className="text-sm font-bold text-cozy-brown mb-4 flex items-center gap-2">
             <PieIcon size={16} /> Distribuição por Projeto
           </h3>
           
           {totalMinutes > 0 ? (
             <div className="flex items-center gap-6 w-full">
                {/* Chart */}
                <div 
                  className="w-24 h-24 rounded-full shrink-0 shadow-inner border-4 border-white"
                  style={{ background: pieChartGradient }}
                ></div>
                
                {/* Legend */}
                <div className="flex-1 flex flex-col gap-2 max-h-32 overflow-y-auto text-xs">
                  {projectStats.map((stat, idx) => {
                     const colors = ['bg-[#FFB7B2]', 'bg-[#B5EAD7]', 'bg-[#E2F0CB]', 'bg-[#C7CEEA]', 'bg-[#FFDAC1]', 'bg-[#FF9AA2]', 'bg-[#E0BBE4]', 'bg-[#957DAD]'];
                     return (
                       <div key={stat.name} className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`}></div>
                            <span className="font-semibold text-gray-600 truncate max-w-[80px]">{stat.name}</span>
                         </div>
                         <span className="text-gray-400">{Math.round(stat.percentage)}%</span>
                       </div>
                     );
                  })}
                </div>
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center h-24 text-gray-300">
               <p className="text-sm">Sem dados para este período</p>
             </div>
           )}
        </div>
      </div>

      {/* Favorite Cats Collection Stats */}
      <div>
        <h3 className="text-lg font-bold text-cozy-brown mb-4 flex items-center gap-2">
          <Award className="text-cozy-primary" />
          Gatos Favoritos
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.values(CatType).map((catType) => {
             const count = catCounts[catType] || 0;
             if (count === 0 && !userState.unlockedCats.includes(catType)) return null; // Hide if not owned and count is 0

             return (
               <div key={catType} className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 shrink-0">
                    <img src={CAT_ASSETS[catType]} alt={catType} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{catType}</span>
                    <span className="text-xl font-bold text-cozy-brown">{count}</span>
                  </div>
               </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default Progress;
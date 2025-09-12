import React from 'react';
import { Flame, Calendar } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
  bestStreak: number;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ streak, bestStreak }) => {
  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-purple-600 dark:text-purple-400';
    if (streak >= 14) return 'text-orange-600 dark:text-orange-400';
    if (streak >= 7) return 'text-red-600 dark:text-red-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  const getFlameAnimation = (streak: number) => {
    if (streak >= 7) return 'animate-bounce';
    return '';
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-gray-600">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Streak</h3>
        <Flame className={`h-6 w-6 ${getStreakColor(streak)} ${getFlameAnimation(streak)}`} />
      </div>
      
      <div className="text-center">
        <div className={`text-4xl font-bold ${getStreakColor(streak)} mb-2`}>
          {streak}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {streak === 1 ? 'day' : 'days'} in a row!
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>Best: {bestStreak} days</span>
        </div>
      </div>

      {/* Streak milestones */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">Next milestone:</span>
          <span className="text-xs font-medium text-gray-900 dark:text-white">
            {streak >= 30 ? 'Streak Legend!' : streak >= 14 ? '30 days' : streak >= 7 ? '14 days' : '7 days'}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              streak >= 30 ? 'bg-purple-500' :
              streak >= 14 ? 'bg-orange-500' :
              streak >= 7 ? 'bg-red-500' : 'bg-yellow-500'
            }`}
            style={{
              width: `${Math.min(
                100,
                streak >= 30 ? 100 :
                streak >= 14 ? ((streak - 14) / 16) * 100 + 100 :
                streak >= 7 ? ((streak - 7) / 7) * 100 + 100 :
                (streak / 7) * 100
              )}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};
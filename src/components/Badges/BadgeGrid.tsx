import React from 'react';
import { Badge } from '../../types';
import { Calendar, Lock } from 'lucide-react';

interface BadgeGridProps {
  badges: Badge[];
}

const getBadgeColor = (category: string) => {
  switch (category) {
    case 'quiz': return 'from-blue-500 to-blue-600';
    case 'streak': return 'from-orange-500 to-red-600';
    case 'points': return 'from-green-500 to-emerald-600';
    case 'quest': return 'from-purple-500 to-indigo-600';
    case 'special': return 'from-pink-500 to-rose-600';
    default: return 'from-gray-500 to-gray-600';
  }
};

export const BadgeGrid: React.FC<BadgeGridProps> = ({ badges }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {badges.map((badge, index) => (
        <div
          key={badge.id}
          className={`
            relative p-6 rounded-xl border transition-all duration-500 transform
            ${badge.earned 
              ? 'bg-white dark:bg-gray-800 border-green-200 dark:border-green-700 shadow-lg hover:shadow-xl hover:-translate-y-1' 
              : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-60'
            }
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {!badge.earned && (
            <div className="absolute top-2 right-2">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
          )}

          <div className="text-center">
            <div className={`
              mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4
              ${badge.earned 
                ? `bg-gradient-to-br ${getBadgeColor(badge.category)} shadow-lg` 
                : 'bg-gray-200 dark:bg-gray-600'
              }
            `}>
              {badge.earned ? badge.icon : '🔒'}
            </div>
            
            <h3 className={`text-lg font-semibold mb-2 ${
              badge.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {badge.name}
            </h3>
            
            <p className={`text-sm mb-3 ${
              badge.earned ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
            }`}>
              {badge.description}
            </p>

            <div className={`text-xs px-2 py-1 rounded-full inline-block mb-2 ${
              badge.earned 
                ? `bg-gradient-to-r ${getBadgeColor(badge.category)} text-white`
                : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
            }`}>
              {badge.category.charAt(0).toUpperCase() + badge.category.slice(1)} Badge
            </div>

            {badge.earned && badge.earnedDate && (
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
                <Calendar className="h-3 w-3" />
                <span>Earned {badge.earnedDate.toLocaleDateString()}</span>
              </div>
            )}

            {!badge.earned && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {badge.requirement}
              </p>
            )}
          </div>

          {badge.earned && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 hover:opacity-10 transition-opacity duration-300" />
          )}
        </div>
      ))}
    </div>
  );
};
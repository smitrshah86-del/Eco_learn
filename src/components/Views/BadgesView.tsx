import React, { useState } from 'react';
import { BadgeGrid } from '../Badges/BadgeGrid';
import { Award, Filter } from 'lucide-react';
import { Badge } from '../../types';

interface BadgesViewProps {
  badges: Badge[];
}

export const BadgesView: React.FC<BadgesViewProps> = ({ badges }) => {
  const [filter, setFilter] = useState<string>('all');
  
  const earnedBadges = badges.filter(b => b.earned);
  const totalBadges = badges.length;
  
  const filteredBadges = badges.filter(badge => {
    if (filter === 'all') return true;
    if (filter === 'earned') return badge.earned;
    if (filter === 'unearned') return !badge.earned;
    return badge.category === filter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Badge Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Earn badges for your environmental achievements
          </p>
        </div>
        <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400">
          <Award className="h-8 w-8" />
          <span className="text-2xl font-bold">{earnedBadges.length}</span>
          <span className="text-sm">/{totalBadges}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progress</h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {earnedBadges.length} of {totalBadges} badges earned
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${(earnedBadges.length / totalBadges) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {Math.round((earnedBadges.length / totalBadges) * 100)}% complete
        </p>
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Badges</option>
            <option value="earned">Earned</option>
            <option value="unearned">Not Earned</option>
            <option value="quiz">Quiz Badges</option>
            <option value="streak">Streak Badges</option>
            <option value="points">Points Badges</option>
            <option value="quest">Quest Badges</option>
            <option value="special">Special Badges</option>
          </select>
        </div>
      </div>

      {/* Badge Grid */}
      <BadgeGrid badges={filteredBadges} />
    </div>
  );
};
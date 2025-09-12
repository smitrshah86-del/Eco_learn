import React, { useState } from 'react';
import { LeaderboardTable } from '../Leaderboard/LeaderboardTable';
import { Trophy, Users, School } from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('individual');

  const tabs = [
    { id: 'individual', label: 'Individual', icon: Users },
    { id: 'school', label: 'School', icon: School },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            See how you rank among other eco-warriors in Punjab
          </p>
        </div>
        <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400">
          <Trophy className="h-8 w-8" />
          <span className="text-2xl font-bold">#1</span>
          <span className="text-sm">Your Rank</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === 'individual' ? (
            <LeaderboardTable />
          ) : (
            <div className="text-center py-12">
              <School className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                School Leaderboard
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Coming soon! School rankings will be available once more institutions join.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Your Position Highlight */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              You're in 1st place! 🎉
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Keep up the amazing work! You're leading by 70 points.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
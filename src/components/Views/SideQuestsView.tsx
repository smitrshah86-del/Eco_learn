import React from 'react';
import { QuestCard } from '../SideQuests/QuestCard';
import { Target, Star, Clock } from 'lucide-react';
import { SideQuest } from '../../types';

interface SideQuestsViewProps {
  quests: SideQuest[];
  onStartQuest: (questId: string) => void;
}

export const SideQuestsView: React.FC<SideQuestsViewProps> = ({ quests, onStartQuest }) => {
  const completedQuests = quests.filter(q => q.completed).length;
  const activeQuests = quests.filter(q => !q.completed);
  const totalPoints = quests.reduce((sum, q) => sum + (q.completed ? q.points : 0), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Side Quests
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete real-world environmental challenges
          </p>
        </div>
        <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
          <Target className="h-8 w-8" />
          <span className="text-2xl font-bold">{completedQuests}</span>
          <span className="text-sm">Completed</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Quests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeQuests.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Points Earned</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalPoints}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">45m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Quests */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Available Quests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onStartQuest={onStartQuest}
            />
          ))}
        </div>
      </div>

      {/* Completed Quests */}
      {completedQuests > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Completed Quests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quests.filter(q => q.completed).map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onStartQuest={onStartQuest}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
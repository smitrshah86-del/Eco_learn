import React from 'react';
import { Clock, CheckCircle, Camera, List, MessageSquare, Zap, Star } from 'lucide-react';
import { SideQuest } from '../../types';

interface QuestCardProps {
  quest: SideQuest;
  onStartQuest: (questId: string) => void;
}

const getQuestIcon = (type: string) => {
  switch (type) {
    case 'photo': return Camera;
    case 'checklist': return List;
    case 'survey': return MessageSquare;
    case 'action': return Zap;
    default: return Star;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
    case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
    default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
  }
};

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onStartQuest }) => {
  const Icon = getQuestIcon(quest.type);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{quest.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{quest.type} Quest</p>
          </div>
        </div>
        {quest.completed && (
          <CheckCircle className="h-6 w-6 text-green-500 animate-pulse" />
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{quest.description}</p>

      <div className="flex items-center space-x-3 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
          {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
        </span>
        <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{quest.timeRequired}</span>
        </div>
        <div className="flex items-center space-x-1 text-yellow-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">{quest.points} points</span>
        </div>
      </div>

      {/* Quest Instructions Preview */}
      {quest.instructions.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Instructions:</p>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            {quest.instructions.slice(0, 2).map((instruction, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                <span>{instruction}</span>
              </li>
            ))}
            {quest.instructions.length > 2 && (
              <li className="text-gray-500 dark:text-gray-400 text-xs">
                +{quest.instructions.length - 2} more steps...
              </li>
            )}
          </ul>
        </div>
      )}

      <button
        onClick={() => onStartQuest(quest.id)}
        disabled={quest.completed}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          quest.completed
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-700'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        {quest.completed ? 'Completed' : 'Start Quest'}
      </button>
    </div>
  );
};
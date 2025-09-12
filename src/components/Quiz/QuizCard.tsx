import React from 'react';
import { Clock, Star, BookOpen, CheckCircle } from 'lucide-react';
import { Quiz } from '../../types';

interface QuizCardProps {
  quiz: Quiz;
  isCompleted: boolean;
  onStartQuiz: (quizId: string) => void;
}

const SDG_COLORS = {
  1: 'bg-red-500', 2: 'bg-yellow-500', 3: 'bg-green-500', 4: 'bg-red-600',
  5: 'bg-orange-500', 6: 'bg-blue-500', 7: 'bg-yellow-600', 8: 'bg-red-700',
  9: 'bg-orange-600', 10: 'bg-pink-500', 11: 'bg-yellow-700', 12: 'bg-green-600',
  13: 'bg-green-700', 14: 'bg-blue-600', 15: 'bg-green-800', 16: 'bg-blue-800',
  17: 'bg-indigo-600'
};

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, isCompleted, onStartQuiz }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${SDG_COLORS[quiz.sdg as keyof typeof SDG_COLORS]} rounded-lg flex items-center justify-center`}>
            <span className="text-white font-bold text-sm">SDG</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{quiz.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">SDG {quiz.sdg}</p>
          </div>
        </div>
        {isCompleted && (
          <CheckCircle className="h-6 w-6 text-green-500 animate-pulse" />
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{quiz.description}</p>

      <div className="flex items-center space-x-4 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
          {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
        </span>
        <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{Math.floor(quiz.timeLimit / 60)} min</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm">{quiz.questions.length} questions</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-yellow-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">{quiz.points} points</span>
        </div>
        <button
          onClick={() => onStartQuiz(quiz.id)}
          disabled={isCompleted}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isCompleted
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-700'
              : 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
          }`}
        >
          {isCompleted ? 'Completed' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
};
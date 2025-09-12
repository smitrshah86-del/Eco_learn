import React, { useState } from 'react';
import { QuizCard } from '../Quiz/QuizCard';
import { QuizInterface } from '../Quiz/QuizInterface';
import { BookOpen, Filter, Search } from 'lucide-react';
import { Quiz, User } from '../../types';

interface QuizzesViewProps {
  quizzes: Quiz[];
  user: User;
  onQuizComplete: (quizId: string, score: number, totalQuestions: number) => void;
}

export const QuizzesView: React.FC<QuizzesViewProps> = ({ quizzes, user, onQuizComplete }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || quiz.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const handleStartQuiz = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      setSelectedQuiz(quiz);
    }
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    if (selectedQuiz) {
      onQuizComplete(selectedQuiz.id, score, totalQuestions);
      setSelectedQuiz(null);
    }
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
  };

  if (selectedQuiz) {
    return (
      <QuizInterface
        quiz={selectedQuiz}
        onComplete={handleQuizComplete}
        onBack={handleBackToQuizzes}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SDG Quizzes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test your knowledge on Sustainable Development Goals
          </p>
        </div>
        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
          <BookOpen className="h-8 w-8" />
          <span className="text-2xl font-bold">{user.completedQuizzes.length}</span>
          <span className="text-sm">Completed</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            isCompleted={user.completedQuizzes.includes(quiz.id)}
            onStartQuiz={handleStartQuiz}
          />
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No quizzes found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};